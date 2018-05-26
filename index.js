const cluster = require('cluster');
const framework = require('connect')();
const http = require('http');
const path = require('path');
const swagger = require('swagger-tools');
const yaml = require('yamljs');
const auth = require('./src/controllers/auth');
const response = require('./src/helpers/response');
const maxCPUs = require('os').cpus().length;

const isProduction = process.env.NODE_ENV === 'production';
const limitCPUs = Math.min(maxCPUs, 4);
const numCPUs = isProduction ? (process.env.NUM_CPUS || limitCPUs) : 1;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.


  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const apiJson = yaml.load(path.join(__dirname, '/config/swagger.yaml'));


  if (isProduction) {
    apiJson.host = 'api.watchtowertrading.com';
  }

  console.log('starting api in env', isProduction ? 'production' : 'development');

  swagger.initializeMiddleware(apiJson, (middleware) => {

    //swagger init
    framework.use(middleware.swaggerMetadata());

    //CORS and response init
    framework.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      // OPTIONS requests return headers
      if (req.method.toLowerCase() === 'options') {
        return res.end();
      }

      //give us a place to store error/responses
      req.data = { statusCode : 200 };
      res.data = { statusCode : 200 };
      next();
    });

    //auth
    framework.use(middleware.swaggerSecurity({
      Bearer: auth.jwt
    }));

    //auth error
    framework.use((req, res, next) => {
      if (req.data.statusCode !== 200) {
        return response.send(res, req.data);
      }

      next();
    });

    //validation
    framework.use(middleware.swaggerValidator({
      validateResponse: false //true
    }));

    //router
    framework.use(middleware.swaggerRouter({
      useStubs: !isProduction,
      controllers: './src/controllers'
    }));

    //UI
    //use 3rd party module for providing auth headers
    framework.use(middleware.swaggerUi({
      swaggerUiDir: path.join(__dirname, '/node_modules/swagger-ui/dist')
    }));

    //handle all responses
    framework.use((req, res, next) => {
      response.send(res, res.data, next);
    });

    //error logging
    framework.use((req, res, next) => {
      if (res.data.statusCode >= 400) {
        // log.error('wt-api', {
        //   req: {
        //     headers: req.headers,
        //     url: req.originalUrl,
        //     body: req.body || {}
        //   },
        //   res: res.data
        // });
      }

      next();
    });

    const PORT = process.env.PORT || 10011;

    //start the server
    http.createServer(framework)
      .listen(PORT, () => {
        console.info(`wt-api listening on port ${PORT}`);
      });
  });
}


module.exports = framework; // for testing
