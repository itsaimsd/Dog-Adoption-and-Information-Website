// This file contains utility functions, including the authenticateToken middleware for verifying JWT tokens.

const jwt = require('jsonwebtoken')
// jwt token
function authenticateToken(req,res,next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if(token == null) return res.sendStautus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStautus(401);
        req.user = user;
        next();
    });
}

module.exports = {
    authenticateToken
};