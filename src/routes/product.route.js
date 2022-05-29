const { Router } = require("express");
const router = Router();
const ProductController = require("../controller/product.controller");
const productController = new ProductController();



router.get('/category/:id', (req, res) => {
    productController.getByCategory(req, res);
});

router.get("/:id", (req, res) => {
    productController.getViewProduct(req, res);
})

module.exports = router;