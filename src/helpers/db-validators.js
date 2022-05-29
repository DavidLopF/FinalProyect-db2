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

const existUser = (req, res, next) => {
    const { email } = req.body;

    marketplace.query(`SELECT * FROM public.user WHERE email = '${email}'`)
        .then(result => {
            if (result.rowCount === 0) {
                res.render('error', {
                    message: 'User not found',
                    url: '/auth/register'
                })

            } else {
                next();
            }
        }
        )

}
module.exports = {
    ValidateUniqueUser,
    existUser
}