const jwt = require('jsonwebtoken');

const generateJSW_Buyer = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid } //payload
        jwt.sign(payload, process.env.TOKEN_BUYER, (err, token) => {
            if (err) {
                console.log(err);
                reject('error generating token');
            } else {
                resolve(token);
            }
        })
    })
}

const generateJSW_Supplier = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid } //payload

        jwt.sign(payload, process.env.TOKEN_SUPPLIER, (err, token) => {
            if (err) {
                console.log(err);
                reject('error generating token');
            } else {
                resolve(token);
            }
        })
    })
}


module.exports = {
    generateJSW_Buyer,
    generateJSW_Supplier
}