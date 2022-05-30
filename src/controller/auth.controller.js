const bcrypt = require("bcryptjs");
const db = require('../models/index');
const { generateJSW_Buyer, generateJSW_Supplier } = require("../helpers/generate-jws");

//____________________________________Imports__________________________________________


class authController {
    constructor() {
        this.user = db.User;
        this.supplier = db.Supplier;
        this.buyer = db.Buyer;
    }

    async register(req, res) {
        const type = req.body.type;
        let pass = req.body.password;
        const salt = bcrypt.genSaltSync(10);
        pass = bcrypt.hashSync(pass, salt);
        const body = req.body;
        const user = await this.user.create({
            full_name: body.name,
            id_number_type: body.dni_type,
            id_number: body.dni,
            email: body.email,
            password: pass,
            cellphone: body.cellphone,
            address: body.address,
            city: body.city,
        });

        if (type == "supplier") {
            const supplier = await this.supplier.create({
                user_id: user.id,
            });
            if (supplier) {
                const token = await generateJSW_Supplier(user.id);
                res.render('user/user', {
                    user: user,
                    supplier: true,
                    token: token
                });
            }
        } else if (type == "buyer") {
            const buyer = await this.buyer.create({
                user_id: user.id,
            });
            if (buyer) {
                const token = await generateJSW_Buyer(user.id);
                res.render('user/user', {
                    user: user,
                    buyer: true,
                    token: token
                });
            }
        }
    }
    getViewRegister(req, res) {
        res.render('auth/register');
    };

    getViewLogin(req, res) {
        res.render('auth/login');
    }

    async login(req, res) {
        const { email, password } = req.body;
        let user = await db.User.findOne({
            where: {
                email: email
            }
        });
        user = user.toJSON();
        const pass = bcrypt.compareSync(password, user.password);
        if (pass) {
            const supplier = await db.Supplier.findOne({
                where: {
                    user_id: user.id
                }
            });
            delete user.password;
            if (supplier) {
                const token = await generateJSW_Supplier(user.id);
                res.render('user/user', {
                    user: user,
                    supplier: true,
                    token: token
                });
            } else {
                //eliminar el campo password del objeto user
                delete user.password;
                const buyer = await db.Buyer.findOne({
                    where: {
                        user_id: user.id
                    }
                });
                if (buyer) {
                    const token = await generateJSW_Buyer(user.id);
                    res.render('user/user', {
                        user: user,
                        buyer: true,
                        token: token
                    });
                } else {
                    res.render('auth/login', {
                        error: "Usuario no registrado"
                    });
                }
            }
        } else {
            res.render('error', {
                message: 'Contraseña incorrecta',
                url: '/auth/login'
            })
        }
    }

}
module.exports = authController;