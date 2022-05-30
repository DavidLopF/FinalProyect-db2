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
                    attributes: ['id', 'full_name', 'email']
                }]
            }, {
                model: db.Shipment_details,
                as: 'shipment_details',
                attributes: ['id', 'shipment_type', 'addres'],
                include: [{
                    model: db.Checkout_process,
                    as: 'checkout_process',
                    attributes: ['shopping_car_id'],
                }]
            }]
        });
        if (getOrder) {
            getOrder = getOrder.dataValues;
            getOrder.buyer = getOrder.buyer.dataValues;
            getOrder.buyer.user = getOrder.buyer.user.dataValues;
            getOrder.shipment_details = getOrder.shipment_details.dataValues;
            getOrder.shipment_details.checkout_process = getOrder.shipment_details.checkout_process.dataValues;
            let products = await db.Product.findAll({
                where: { id: getOrder.shipment_details.checkout_process.shopping_car_id },
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
                        attributes: ['id', 'full_name', 'email']
                    }]
                }]
            });
            products = products.map(product => {
                product = product.dataValues;
                product.product_category = product.product_category.dataValues;
                product.supplier = product.supplier.dataValues;
                product.supplier.user = product.supplier.user.dataValues;
                delete product.description;
                delete product.product_category_id;
                delete product.supplier_id;
                return product;
            });
            res.render(`order/order`, {
                order: getOrder,
                user: getOrder.buyer.user,
                products: products
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
        const orders = await Order.find();
        res.json({
            ok: true,
            orders: orders
        });

    }
}









const createOrder = async (req, res) => {

    const { shoppingCart, payment, address } = req.body;
    if (shoppingCart.length > 0) {
        let token = req.headers.authorization.split(" ")[1];
        const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);

        const getBuyer = await marketplace.getBuyer(uid);
        const shop_car_id = await marketplace.createShoppingCart(getBuyer);
        let price = 0

        console.log('shopping car ', shop_car_id);


        shoppingCart.forEach(async (product) => {
            const productItem = `INSERT INTO public.product_items(product_id, shopping_car_id) VALUES ('${product.product_id}', '${shop_car_id}') RETURNING id`;
            await marketplace.query(productItem);
            price += parseInt(product.product_price);

        });


        const checkOutProcess = `INSERT INTO public.checkout_process(shopping_car_id, buyer_id) VALUES ('${shop_car_id}', '${getBuyer}') RETURNING id`;
        const checkOutProcess_id = await marketplace.query(checkOutProcess);
        const paymentType = await marketplace.getPaymentType(payment.method);
        const card_id = await marketplace.validateCard(payment, getBuyer);
        const payment_final = await marketplace.createPayment(paymentType, card_id);
        const order = await marketplace.createOrder(payment_final, getBuyer, checkOutProcess_id, shop_car_id, price);

        console.log(`shopping_cart_${getBuyer}`);
        await redis.delete_shoppingCart(`shopping_cart_${getBuyer}`);

        //guardar la orden en mongo y la direccion como type coords
        const order_json = {
            order_id: order,
            buyer_id: getBuyer,
            payment_id: payment_final,
            checkout_process_id: checkOutProcess_id.rows[0].id,
            shopping_car_id: shop_car_id,
            price: price,
            address: address
        }

        const order_mongo = new Order(order_json);
        await order_mongo.save();

        res.json({
            ok: true,
            message: 'Orden creada correctamente',
            order_id: order,
            shopping_car_id: shop_car_id
        });

    } else {
        res.status(400).json({
            ok: false,
            message: 'No hay productos en el carrito'
        });
    }
};







module.exports = new OrderController();