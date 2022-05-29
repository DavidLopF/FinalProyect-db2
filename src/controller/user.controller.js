
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
        res.render('purchase')
    }

    getCart(req, res) {
        res.render('cart')
    }

    getProcess(req, res) {
        res.render('process')
    }
}

module.exports = new UserController();