const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { addProduct, getError, getShoppingCart } = require("../controller/shopping_cart.controller");
const { validateJWT, validateData } = require("../middlewares/export");


router.post("/add", [
    check("product", "product is required").not().isEmpty(),
    validateJWT,
    validateData,
], addProduct)

router.get("/error", getError)
router.get("/", [validateJWT], getShoppingCart)



module.exports = router;

