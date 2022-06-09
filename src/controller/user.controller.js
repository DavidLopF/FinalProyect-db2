const cloudinary = require('cloudinary');
cloudinary.config(process.env.CLOUDINARY_URL);
const db = require('../models/index');

class UserController {
    constructor() {
        this.user = db.User;
    }
    getUser(req, res) {
        res.render('user', {
            title: 'politas'
        });
    };
    getUserLogin(req, res) {
        res.render('user_login')
    }

    getPurchase(req, res) {
        console.log("------------------> paso por aqui")
        res.render('user/purchases')
    }
    getCart(req, res) {
        res.render('shopping_car/cart')
    }
    getProcess(req, res) {
        res.render('shopping_car/process')
    }
    updateAvatar(req, res) {
        const avatar = req.files.avatar;
        const id = req.params.id;
        cloudinary.uploader.upload(avatar.tempFilePath, async (result) => {
            const url = result.url;
            const user = await this.user.update({
                img_profile: url
            }, {
                where: {
                    id: id
                }
            })
            res.status(200).json({
                url: url
            })
        });
    }

    
}

module.exports = new UserController();