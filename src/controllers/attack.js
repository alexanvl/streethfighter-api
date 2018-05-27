function attack(attacker, defender) {
    const attack = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    if (attack < 50) {
        attack = 0
    }
    defender.hp -= attack
    if (defender.hp <= 0) {
        defneder.hp = 0
    }
    return defender
}

function defend(attacker, defender) {
    const defend = Math.floor(Math.random() * (max - 0 + 1)) + 0;
    if (defend < 50) {
        defend = 0
    }
    defener.hp += defend
    
    return defender
}