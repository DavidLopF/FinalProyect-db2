const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const path = require('path');
const colors = require('colors');
const hbs = require('express-handlebars');
const db = require('./models/index');
//const { dbConection } = require("./db/mongo");



class Server {
    constructor() {
        this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || 'localhost';
        this.app = express();
        this.Server = require('http').createServer(this.app);
        this.midelwares();
        //this.database();
        //routes
        this.user = '/user';
        this.auth = '/auth';
        this.products = '/products';
        this.shopping_cart = '/shop_cart';
        this.order = '/order';
        //this.routes();
    }

    routes() {
        this.app.use(this.user, require('./routes/user.route'));
        this.app.use(this.auth, require('./routes/auth.route'));
        this.app.use(this.products, require('./routes/product.route'));
        this.app.use(this.shopping_cart, require('./routes/shopping_cart.route'));
        this.app.use(this.order, require('./routes/order.route'));
        this.app.get('/', (req, res) => {
            const query = 'SELECT * FROM public.products LIMIT 5'
            marketplace.query(query).then((result) => {
                const product_categories = 'SELECT * FROM public.product_categories'
                marketplace.query(product_categories).then((result2) => {
                    res.render('index', {
                        products: result.rows,
                        categories: result2.rows
                    });
                })
            })
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
