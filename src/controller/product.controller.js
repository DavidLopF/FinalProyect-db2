const Cache = require('../db/redis');
const cache = new Cache();
const colors = require('colors');
const db = require('../models/index');
//_________________________imports___________________________________________________



class ProductController {
    constructor() {
        this.product = db.Product;
        this.product_detail = db.Product_details;
    }
    async getViewProduct(req, res) {
        const id = req.params.id;
        let product = await this.product.findOne({
            where: {
                id: id
            }
        });
        let product_detail = await this.product_detail.findOne({
            where: {
                product_id: id
            }
        });
        product = product.toJSON();
        product_detail = product_detail.toJSON();
        res.render(`product/product`, {
            product: product,
            product_detail: product_detail
        });
    };


    async getByCategory(req, res) {
        const id = req.params.id;
        try {
            const queryCache = await cache.get(`product_category_${id}`);
            console.log(queryCache);
            if (queryCache) {
                res.status(200).json({
                    ok: true,
                    products: JSON.parse(queryCache)
                });
            } else {
                let products = await this.product.findAll({
                    where: {
                        product_category_id: id
                    }
                });
                products = products.map(product => product.toJSON());
                await cache.add_listProducts(`product_category_${id}`, JSON.stringify(products));
                res.status(200).json({
                    ok: true,
                    products: products
                });
            }
        } catch (err) {
            console.log(colors.bgRed.white(err));
            res.status(500).json({
                ok: false,
                err
            });
        }
    }
}






//________________________________end methods_______________________________________
module.exports = ProductController;