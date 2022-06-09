const jwt = require('jsonwebtoken');
const Cache = require('../db/redis')
const cache = new Cache()
const db = require('../models/index')

class SupplierController{
    constructor(){
        this.supplier = db.Supplier;
        this.product = db.Product;
        this.product_details = db.Product_details;
        this.product_item = db.Product_item;
        this.brand = db.Brand;
    }

    async getMyProducts(req, res){
        let token = req.headers.authorization
        //const { uid } = jwt.verify(token, process.env.TOKEN_SUPPLIER);
        const uid  = 14 //por ahora no funciona 
        const current_supplier = await this.supplier.findOne({
            where: {
                user_id: uid
            }
        });
        let products = await this.product.findAll({
            where: {
                supplier_id: current_supplier.id
            }
            
        });
        products = products.map(product => product.toJSON());
        res.render('supplier/my_products', {
            products: products
        });
    }

    async editProduct(req, res){
        
        const product_id = req.params.id
        const product = await this.product.findOne({
            where: {
                id: product_id
            }
        })
        const product_details = await this.product_details.findOne({
            where: {
                product_id: product_id
            }
        })
        let brands = await this.brand.findAll();
        brands = brands.map(brand => brand.toJSON());
        res.render('supplier/edit_product', {
            product: product.dataValues,
            product_details: product_details.dataValues,
            brands: brands
        });
    }

    async getBrands(req, res){
        let brands = await this.brand.findAll();
        brands = brands.map(brand => brand.toJSON());
        console.log(brands)
        res.render('supplier/new_product', {
            brands: brands
        });
    }
        
    async updateProduct(req, res){
        const {name, price ,brand_id ,size ,color} = req.body;
        const product_id = req.params.id
        const product = await this.product.findOne({
            where: {
                id: product_id
            }
        })
        const product_details = await this.product_details.findOne({
            where: {
                product_id: product_id
            }
        })
        await product.update({
            name: name,
            price: price,
            brand_id: brand_id
        })
        await product_details.update({
            size: size,
            color: color
        })
        res.render('supplier/edit_product', {
            product: product.dataValues,
            product_details: product_details.dataValues,
            brands: brands,
            message: 'Producto actualizado correctamente'
        });
    }
            
        
        

    async createProduct(req, res){
        const {name, price ,brand_id ,size ,color, quantity} = req.body;
        //let token = req.headers.authorization.split(" ")[1];
        //const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);
        const uid  = 14 //por ahora no funciona
        const current_supplier = await this.supplier.findOne({
            where: {
                user_id: uid
            }
        });
        let product = await this.product.create({
            name: name,
            price: price,
            brand_id: brand_id,
            supplier_id: current_supplier.id
        });
        let product_details = await this.product_details.create({
            size: size,
            color: color,
            product_id: product.id
        });
       for(let i = 0; i < quantity; i++){
            await this.product_item.create({
                product_id: product.id
            })
        }
        res.render('supplier/my_products', {
            message: 'Producto creado correctamente'
        });
    }
}

module.exports = new SupplierController();