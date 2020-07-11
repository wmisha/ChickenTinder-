const jwt = require('jsonwebtoken')
const { SECRET } = require(__dirname + '/private')

const bodyHasProp = (...propNames) => (req, res, next) => {

    const invalid = propNames.filter(propName => !req.body[propName]);

    if (invalid.length > 0){
        res.status(400).send({ error: `Missing props: [${invalid}]!` });
    } else {
        next();
    }

}


const authorizeJWT = (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth){
        const token = auth.split(' ')[1];
        
        try{
            // we'll verify the jwt synchronously for now,
            // but you could have a jwt.verify(token, secret, (err, decoded) => {})
            // callback instead
            const decoded = jwt.verify(token, SECRET, {
                algorithms: ['HS256']
            })
            req.user_id = decoded.id;
            req.username = decoded.username;
            next()
        } catch (err){
            res.status(403).send({ error: "Invalid Credential!" });
        }
    } else {
        res.status(401).send({ error: "No Auth Header!"});
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
    tryCatchMiddleware,
    authorizeJWT
}