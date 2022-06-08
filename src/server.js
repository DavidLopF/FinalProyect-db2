const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const colors = require('colors');
const hbs = require('express-handlebars');
const db = require('./models/index');
const fileUpload = require('express-fileupload');
//const { dbConection } = require("./db/mongo");



class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || 'localhost';
        this.app = express();
        this.Server = require('http').createServer(this.app);
        this.midelwares();
        //this.database();
        this.user_path = '/user';
        this.auth_path = '/auth';
        this.products_path = '/products';
        this.shopping_cart_path = '/shop_cart';
        this.order_path = '/order';
        this.supplier_path = '/supplier';
        this.product_categories = db.product_categories;
        this.routes();
    }

    routes() {
        this.app.use(this.supplier_path, require('./routes/supplier.route'));
        this.app.use(this.user_path, require('./routes/user.route'));
        this.app.use(this.auth_path, require('./routes/auth.route'));
        this.app.use(this.products_path, require('./routes/product.route'));
        this.app.use(this.shopping_cart_path, require('./routes/shopping_cart.route'));
        this.app.use(this.order_path, require('./routes/order.route'));
        this.app.get('/', async (req, res) => {
            let products = await db.Product.findAll();
            let categories = await db.Product_category.findAll();
            products = products.map(product => product.toJSON());
            categories = categories.map(category => category.toJSON());
            res.render('index', {
                products: products,
                categories: categories
            });
        });

        //configurate 404
        this.app.use((req, res, next) => {
            res.status(404).send('404 Not Found');
        });


    }

    // async database() {
    //     await dbConection();
    // }

    midelwares() {
        this.app.use(cors());
        this.app.use(logger('dev'));

        this.app.use(express.static(path.join(__dirname, 'public')));

        this.app.use(express.urlencoded({ extended: true })); //Esto es para formData
        this.app.use(express.json())


        this.app.engine('.hbs', hbs.engine({
            defaultLayout: 'default',
            extname: '.hbs',
            layoutsDir: path.join(__dirname, 'views', 'layouts'),
            partialsDir: path.join(__dirname, 'views', 'partials')
        }));

        this.app.set('view engine', '.hbs');
        this.app.set('views', path.join(__dirname, 'views'));   
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: 'tmp/',
        }));

    }

    launcher() {
        if (process.env.CREATE_DATABASE === 'true') {
            console.log('Creating database...'.yellow);
            db.sequelize.sync().then(() => {
                this.Server.listen(this.port, this.host, () => {
                    console.log(colors.bgWhite.blue(`Server running in ${this.host}:${this.port}`));
                });
            });
        } else {
            this.Server.listen(this.port, this.host, () => {
                console.log(colors.bgWhite.blue(`Server running in http://${this.host}:${this.port}`));
            });
        }
    }

}

module.exports = Server;
