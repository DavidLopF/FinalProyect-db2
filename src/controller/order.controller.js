// const { render } = require('express/lib/response');
// const jwt = require('jsonwebtoken');
// const Marketplace = require('../db/postgres');
// const marketplace = new Marketplace();
// const Redis = require('../db/redis');
// const { red } = require('colors');
// const redis = new Redis();
// const Order = require('../models/order');

// const getViewOrder = function (req, res) {
//     const id = req.params.id;
//     const query = `SELECT * FROM public.order WHERE id = ${id}`;
//     marketplace.query(query).then((result) => {
//         const user_id = `SELECT * FROM public.buyer b JOIN public.user u ON b.user_id = u.id WHERE b.id = ${result.rows[0].buyer_id}`;
//         marketplace.query(user_id).then((result2) => {
//             const products = `SELECT * FROM public.product_items AS pi INNER JOIN public.products AS pr ON pi.product_id = pr.id INNER JOIN public.product_details AS pd ON pr.id = pd.product_id where shopping_car_id = ${result.rows[0].shopping_car_id}`;
//             marketplace.query(products).then((result3) => {
//                 res.render(`order`, {
//                     order: result.rows[0],
//                     user: result2.rows[0],
//                     products: result3.rows
//                 });
//             });
//         });
//     });
// }

// const getAllOrdersView = (req, res) => {
//     res.render('orders');
// }

// const getAllOrders = async (req, res) => {
//     const token = req.headers.authorization.split(" ")[1];
//     const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);
//     console.log(uid);
// }



// const createOrder = async (req, res) => {

//     const { shoppingCart, payment, address } = req.body;

//     console.log(shoppingCart);

//     if (shoppingCart.length > 0) {
//         let token = req.headers.authorization.split(" ")[1];
//         const { uid } = jwt.verify(token, process.env.TOKEN_BUYER);

//         const getBuyer = await marketplace.getBuyer(uid);
//         const shop_car_id = await marketplace.createShoppingCart(getBuyer);
//         let price = 0

//         console.log('shopping car ', shop_car_id);


//         shoppingCart.forEach(async (product) => {
//             const productItem = `INSERT INTO public.product_items(product_id, shopping_car_id) VALUES ('${product.product_id}', '${shop_car_id}') RETURNING id`;
//             await marketplace.query(productItem);
//             price += parseInt(product.product_price);

//         });



//         const checkOutProcess = `INSERT INTO public.checkout_process(shopping_car_id, buyer_id) VALUES ('${shop_car_id}', '${getBuyer}') RETURNING id`;
//         const checkOutProcess_id = await marketplace.query(checkOutProcess);
//         const paymentType = await marketplace.getPaymentType(payment.method);
//         const card_id = await marketplace.validateCard(payment, getBuyer);
//         const payment_final = await marketplace.createPayment(paymentType, card_id);
//         const order = await marketplace.createOrder(payment_final, getBuyer, checkOutProcess_id, shop_car_id, price);

//         console.log(`shopping_cart_${getBuyer}`);
//         await redis.delete_shoppingCart(`shopping_cart_${getBuyer}`);

//         //guardar la orden en mongo y la direccion como type coords
//         const order_json = {
//             order_id: order,
//             buyer_id: getBuyer,
//             payment_id: payment_final,
//             checkout_process_id: checkOutProcess_id.rows[0].id,
//             shopping_car_id: shop_car_id,
//             price: price,
//             address: address
//         }

//         const order_mongo = new Order(order_json);
//         await order_mongo.save();

//         res.json({
//             ok: true,
//             message: 'Orden creada correctamente',
//             order_id: order,
//             shopping_car_id: shop_car_id
//         });

//     } else {
//         res.status(400).json({
//             ok: false,
//             message: 'No hay productos en el carrito'
//         });
//     }
// };







// module.exports = {
//     createOrder,
//     getViewOrder,
//     getAllOrdersView,
//     getAllOrders
// }