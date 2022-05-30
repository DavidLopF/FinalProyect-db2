
class UserController {
    getUser(req, res) {
        res.render('user', {
            title: 'politas'
        });
    };

    getUserLogin(req, res) {
        res.render('user_login')
    }

    getPurchase(req, res) {
        res.render('user/purchase')
    }

    getCart(req, res) {
        res.render('shopping_car/cart')
    }

    getProcess(req, res) {
        res.render('shopping_car/process')
    }
}

module.exports = new UserController();