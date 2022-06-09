const { Router } = require("express");
const router = Router();
const supplierController = require("../controller/supplier.controller");

router.get('/my_products', (req, res) => {
    supplierController.getMyProducts(req, res);
});

router.get('/edit/:id', (req, res) => {
    supplierController.editProduct(req, res);
})

router.post('/create', (req, res) => {
    supplierController.createProduct(req, res);
});

router.get('/new_product', (req, res) => {
    supplierController.getBrands(req, res);
});

router.put('/update/:id', (req, res) => {
    supplierController.updateProduct(req, res);
});

router.get("/show/:id", (req, res) => {
    supplierController.getProduct(req, res);
});

router.get('/product/:id/variant', (req, res) => {
    supplierController.newProductVariant(req, res);
});

router.post('/product_variant/create',(req, res) =>{
    supplierController.createProductVariant(req, res);
    //res.send("create product variant");
})

router.get('/last',(req, res)=>{
    supplierController.lastProductDetails(req, res);
})


module.exports = router;