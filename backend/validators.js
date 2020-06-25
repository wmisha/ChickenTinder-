const bodyHasProp = (...propNames) => (req, res, next) => {

    const invalid = propNames.filter(propName => !req.body[propName]);

    if (invalid.length > 0){
        res.status(400).send({ error: `Missing props: [${invalid}]!` });
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
    bodyHasProp,
    tryCatchMiddleware
}