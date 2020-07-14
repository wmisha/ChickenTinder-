const db = require('../models')
const Chance = require('chance');
const chance = new Chance();

async function generateJoinCode(){
    const random = chance.integer({
        min: 100000000,
        max: 999999999
    })

    const group = await db.Group.findOne({
        where: { join_code: random }
    })

    if (group){
        return await generateJoinCode();
    }
    return random;
}

module.exports = generateJoinCode;