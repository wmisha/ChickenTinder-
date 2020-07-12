const db = require('./models')

async function getVotesByID(){
    const voteCounts = 0;

    const group = await db.Group.findOne({
        where: { join_code: random }
    })

    if (group){
        return generateJoinCode();
    }
    return random;
}

async function getUnvotesByID(){
    const random = chance.integer({
        min: 100000000,
        max: 999999999
    })

    const group = await db.Group.findOne({
        where: { join_code: random }
    })

    if (group){
        return generateJoinCode();
    }
    return random;
}

module.exports = generateJoinCode;