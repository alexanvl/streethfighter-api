const uuid = require('uuid/v4');

module.exports.success = (obj, code, data, next) =>  {
  //console.log('success',body);
  obj.data.statusCode = code;
  obj.data.body = {
    data,
    request_id: uuid()
  };
  next();
}

module.exports.error = (obj, code, message, next) => {
  //console.log('error',code,message);
  obj.data.statusCode = code;
  obj.data.body = {
    data: { message },
    request_id: uuid()
  };
  next();
}

module.exports.send = (res, data, next) => {
  //console.log('send',data.body);
  res.writeHead(data.statusCode, { 'Content-Type': 'application/json'});
  res.write(JSON.stringify(data.body));
  res.end();

  if (next) {
    next();
  }
}


