const jwt = require('jsonwebtoken');
const Cache = require('../db/redis')
const cache = new Cache()
const db = require('../models/index')


class ShoppingCartController {
    constructor() {
        this.buyer = db.Buyer;
    }

    async addProduct(req, res) {
        let token = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);
        const { product } = req.body
        const getBuyer = await this.buyer.findOne({ where: { id: uid } })
        const getShoppingCart = await cache.get(`shopping_cart_${getBuyer}`)
        if (getShoppingCart) {
            const shopingcart = JSON.parse(getShoppingCart)
            shopingcart.products.push({
                product_id: product.id,
                product_name: product.name,
                product_price: product.price,
                product_quantity: product.quantity,
                product_color: product.color,
                product_image: product.image
            })
            cache.add_shoppingCart(`shopping_cart_${getBuyer}`, JSON.stringify(shopingcart))
            res.status(200).json({
                ok: true,
                message: 'product added to shopping cart',
            })
        } else {
            const shopingcart = {
                user_id: getBuyer,
                products: [{
                    product_id: product.id,
                    product_name: product.name,
                    product_price: product.price,
                    product_quantity: product.quantity,
                    product_color: product.color,
                    product_image: product.image
                }]
            }
            const temp = await cache.add_shoppingCart('shopping_cart_' + getBuyer, JSON.stringify(shopingcart));
            if (temp) {
                res.status(200).json({
                    ok: true,
                    message: 'product added to cart'
                })
            } else {
                res.status(500).json({
                    ok: false,
                    message: 'error'
                })
            }
        }
    }

    async getShoppingCart(req, res) {
        let token = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);
        const getBuyer = await this.buyer.findOne({ where: { id: uid } })
        const getShoppingCart = await cache.get(`shopping_cart_${getBuyer}`)
        console.log(getShoppingCart)
        if (getShoppingCart) {
            res.status(200).json({
                ok: true,
                message: 'shopping cart',
                shopping_cart: JSON.parse(getShoppingCart)
            })
        } else {
            res.status(200).json({
                ok: true,
                message: 'shopping cart',
                shopping_cart: {
                    user_id: getBuyer,
                    products: []
                }
            })
        }
    }


    getError(req, res) {
        res.render('error', {
            message: 'you are a supplier  or expired your session',
            url: '/auth/login'
        })
    }
}







module.exports = new ShoppingCartController()

