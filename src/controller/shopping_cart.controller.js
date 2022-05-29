const jwt = require('jsonwebtoken');
const Cache = require('../db/redis')
const cache = new Cache()
const Marketplace = require('../db/postgres')
const marketplace = new Marketplace()


const addProduct = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);
    const { product } = req.body


    const getBuyer = await marketplace.getBuyer(uid);

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


const getShoppingCart = async (req, res) => {
    let token = req.headers.authorization.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);

    const getBuyer = await marketplace.getBuyer(uid);
    const getShoppingCart = await cache.get(`shopping_cart_${getBuyer}`)
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


const getError = (req, res) => {
    res.render('error', {
        message: 'you are a supplier  or expired your session',
        url: '/auth/login'
    })
}

module.exports = {
    addProduct,
    getError,
    getShoppingCart
}

