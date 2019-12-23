const request = require('request');
const jwt = require('jsonwebtoken');

module.exports = function validateToken(req, res, next) {
    //const token = req.headers.token;
    let decodedJwt = jwt.decode(req.token, {complete: true});
    if(decodedJwt.payload.doc.isAdmin === true){
        next();
    }
    else{

        return res.status(403).json({message: "Permissions denied"});
    }

};