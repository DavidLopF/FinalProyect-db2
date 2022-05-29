const db = require('../models/index');

const ValidateUniqueUser = async (req, res, next) => {
    const { email, dni } = req.body;
    const user = await db.User.findOne({
        where: {
            [db.Sequelize.Op.or]: [{
                email: email
            }, {
                id_number: dni
            }]
        }
    });
    if (!user) {
        next();
    } else {
        res.render('error', {
            message: 'User already exists',
            url: '/auth/register'
        })
    }
}

const existUser = async (req, res, next) => {
    const { email } = req.body;
    const user = await db.User.findOne({
        where: {
            email: email
        }
    });
    if (!user) {
        res.render('error', {
            message: 'User does not found',
            url: '/auth/register'
        })
    } else {
        next();
    }   
}
module.exports = {
    ValidateUniqueUser,
    existUser
}