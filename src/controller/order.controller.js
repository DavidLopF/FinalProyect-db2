const jwt = require('jsonwebtoken');
const Redis = require('../db/redis');
const redis = new Redis();
const db = require('../models/index');


class OrderController {
    constructor() {
        this.order = db.Order;
    }

    async getViewOrder(req, res) {
        const id = req.params.id;
        let getOrder = await this.order.findOne({
            where: { id: id },
            include: [{
                model: db.Buyer,
                as: 'buyer',
                attributes: ['id'],
                include: [{
                    model: db.User,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email', 'id_number', 'city', 'address']
                }]
            }/*, {
                model: db.Shipment_details,
                as: 'shipment_details',
                attributes: ['id', 'shipment_type', 'addres'],
                include: [{
                    model: db.Checkout_process,
                    as: 'checkout_process',
                    attributes: ['shopping_car_id'],
                }]
            }*/]
        });
        if (getOrder) {
            getOrder = getOrder.dataValues;
            getOrder.buyer = getOrder.buyer.dataValues;
            getOrder.buyer.user = getOrder.buyer.user.dataValues;
            //getOrder.shipment_details = getOrder.shipment_details.dataValues;
            //getOrder.shipment_details.checkout_process = getOrder.shipment_details.checkout_process.dataValues;
            let products = await db.Product.findAll({
                where: 4,//{ id: getOrder.shipment_details.checkout_process.shopping_car_id },
                include: [{
                    model: db.Product_category,
                    as: 'product_category',
                    attributes: ['id', 'name'],
                }, {
                    model: db.Supplier,
                    as: 'supplier',
                    attributes: ['id'],
                    include: [{
                        model: db.User,
                        as: 'user',
                        attributes: ['id', 'full_name', 'city', 'address'],
                    }]
                }]
            });
            /*products = products.map(product => {
                product = product.dataValues;
                product.product_category = product.product_category.dataValues;
                product.supplier = product.supplier.dataValues;
                product.supplier.user = product.supplier.user.dataValues;
                delete product.description;
                delete product.product_category_id;
                delete product.supplier_id;
                return product;
            });*/
            console.log(getOrder.buyer.user);
            res.render(`order/order`, {
                order: getOrder,
                user: getOrder.buyer.user
                //products: products
            });
        } else {
            res.status(404).json({
                ok: false,
                message: 'order not found'
            });

        }
    }

    getAllOrdersView(req, res) {
        res.render('order/orders');
    }

    async getAllOrders(req, res) {
        let token = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);
        console.log(uid);
        let getBuyer = await db.Buyer.findOne({
            where: { user_id: uid },
        });
        getBuyer = getBuyer.dataValues;
        let getOrders = await db.Order.findAll({
            where: { buyer_id: getBuyer.id },
        });
        res.json({
            ok: true,
            orders: getOrders
        });
    }

    async createOrder(req, res) {
        const { shoppingCart, payment, address } = req.body;
        if (shoppingCart.length > 0) {
            let token = req.headers.authorization.split(" ")[1];
            const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);

            let getBuyer = await db.Buyer.findOne({
                where: { user_id: uid },
            });
            getBuyer = getBuyer.dataValues;
            let shop_car_id = await db.Shopping_car.findOne({
                where: { buyer_id: getBuyer.id }
            });
            shop_car_id = shop_car_id.dataValues;
            let shipment_details = await db.Shipment_details.create({
                address: address,
                shipment_type: 'shipment',
            });

            let checkout_process_id = await db.Checkout_process.create({
                shopping_car_id: shop_car_id.id,
                buyer_id: getBuyer.id,
                shipment_details_id: shipment_details.id
            })
            let price = 0
            shoppingCart.forEach(async (product) => {
                price += parseInt(product.product_price);
            });

            let order = await db.Order.create({
                buyer_id: getBuyer.id,
                checkout_process_id: checkout_process_id.id,
                status: true,
                amount: `${price}`
            });
            res.json({
                ok: true,
                message: 'Orden creada correctamente',
                order: order
            });

            /*shoppingCart.forEach(async (product) => {
                const productItem = `INSERT INTO public.product_items(product_id, shopping_car_id) VALUES ('${product.product_id}', '${shop_car_id.id}') RETURNING id`;
                await marketplace.query(productItem);
                price += parseInt(product.product_price);
            });*/



        } else {
            res.status(400).json({
                ok: false,
                message: 'No hay productos en el carrito'
            });
        }
    };
}

module.exports = new OrderController();