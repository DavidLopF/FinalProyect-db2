const { Router } = require("express");
const router = Router();
const userController = require("../controller/user.controller");
const orderController = require("../controller/order.controller");


router.get("/", (req, res) => {
    userController.getUser(req, res);
});

router.get("/login", (req, res) => {
    userController.getUserLogin(req, res);
});

router.get("/my_purchases", (req, res) => {
    userController.getPurchase(req, res);
})

router.get("/checkout", (req, res) => {
    userController.getProcess(req, res);
})

router.get("/cart", (req, res) => {
    userController.getCart(req, res);
})

router.get("/order", (req, res) => {
    orderController.getAllOrdersView(req, res);
})

router.get("/orders", (req, res) => {
    orderController.getAllOrders(req, res);
})

router.get('/profile', (req, res) => {
    res.render('user/user');
})

router.put('/avatar/:id', (req, res) => {
    userController.updateAvatar(req, res);
})



module.exports = router;