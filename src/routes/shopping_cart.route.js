const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const shopingcartController = require("../controller/shopping_cart.controller");
const { validateJWT, validateData } = require("../middlewares/export");


router.post("/add", [
    check("product", "product is required").not().isEmpty(),
    validateJWT,
    validateData,
], (req, res) => {
    shopingcartController.addProduct(req, res);
})

router.get("/error", (req, res) => {
    shopingcartController.getError(req, res);
})
router.get("/", [validateJWT], (req, res) => {
    shopingcartController.getShoppingCart(req, res);
})



module.exports = router;

