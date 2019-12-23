const jwt = require('jsonwebtoken');
module.exports = function(req, res, next) {
    if (!req.headers.token) {
        return res.status(401).send({ error: 'Token Missing' });
    }
    const token = req.headers.token;
    if(!jwt.decode(token, {complete: true})){
        return res.status(401).send({ error: 'invalid token!!' });
    }
    else{
        next();
    }

};