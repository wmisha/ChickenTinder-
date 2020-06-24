const bodyHasPropValidator = (propName) => (req, res, next) => {
    const prop = req.body[propName];

    if (!prop){
        res.status.send({error: `No ${propName}!`});
    } else {
        next();
    }
}

const tryCatchMiddleware = async (req, res, next) => {
    try {
        next();
    } catch (err){
        console.log(err);
    }
}

module.exports = {
    bodyHasPropValidator,
    tryCatchMiddleware
}