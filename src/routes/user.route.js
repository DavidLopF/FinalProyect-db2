const { Router } = require("express");
const router = Router();

const { getUser, getUserLogin, getPurchase, getCart, getProcess } = require("../controller/user.controller");
const { getAllOrdersView, getAllOrders} = require("../controller/order.controller");


router.get("/", getUser);

router.get("/login", getUserLogin);

router.get("/my_purchases", getPurchase)

router.get("/checkout", getProcess)

router.get("/cart", getCart)

router.get("/order", getAllOrdersView)

router.get("/orders", getAllOrders)

module.exports = router;