const { response, request } = require("express");
const jwt = require('jsonwebtoken');


const validateJWT = (req = request, res = response, next) => {
    let token = req.headers.authorization;
    try {
        if (!token) {
            return res.status(500).json({
                ok: false,
                message: 'token invalid or expired your session',
            })
        } else {
            token = token.split(" ")[1]
            const verify = jwt.verify(token, process.env.TOKEN_BUYER);
            if (verify) {
                req.user = verify;
                next()
            } else {
                return res.status(500).json({
                    ok: false,
                    message: 'token invalid or expired your session',
                })
            }

        }
    } catch (err) {
        return res.status(500).json({
            ok: false,
            message: 'token invalid or expired your session',
        })
    }
}


module.exports = {
    validateJWT
}