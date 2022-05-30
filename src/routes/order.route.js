const { Router } = require("express");
const router = Router();
const {check} = require('express-validator');
const {validateJWT, validateData, validateShoppingCart} = require('../middlewares/export');
const { route } = require("./product.route");
const orderController = require("../controller/order.controller");


router.get("/:id", (req, res) => {
    orderController.getViewOrder(req, res);
} );

// router.post("/create",[
//     check('address', 'address no found').not().isEmpty(),
//     check('payment', 'payment no found').not().isEmpty(),
//     check('shoppingCart', 'shoppingCart no found').not().isEmpty(),
//     validateShoppingCart, 
//     validateJWT,
//     validateData
// ], createOrder);



module.exports = router;