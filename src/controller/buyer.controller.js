const db = require('../models/index');

class buyerController {
    constructor() {
        this.neo4j = require('../db/neo4J')
        this.user = db.User
        this.buyer = db.Buyer
        this.suppliers = db.Supplier
        this.product = db.Product
    }
    async create(req, res) {
        try {
            let buyers = await this.buyer.findAll({
                include: [{
                    model: this.user,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email']
                }]
            })
            buyers = buyers.map(buyer => buyer.dataValues);
            buyers.forEach(async buyer => {
                delete buyer.user_id
                const id = buyer.id
                delete buyer.id
                const user = buyer.user.dataValues;
                await this.neo4j.createBuyer(id, user.full_name);
            })
            let suppliers = await this.suppliers.findAll({
                include: [{
                    model: this.user,
                    as: 'user',
                    attributes: ['id', 'full_name', 'email']
                }]
            })
            suppliers = suppliers.map(supplier => supplier.dataValues);
            suppliers.forEach(async supplier => {
                delete supplier.user_id
                const id = supplier.id
                delete supplier.id
                const user = supplier.user.dataValues;
                await this.neo4j.createSeller(id, user.full_name);
            })
            let products = await this.product.findAll()
            products = products.map(product => product.dataValues);
            products.forEach(async product => {
                await this.neo4j.createProduct(product.name, product.product_category_id, product.supplier_id);
            })
            res.status(201).json({
                message: 'Buyers created successfully in neo4j',
            })
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Error creating buyers in neo4j',
            })
        }

    }

    async buy(req, res) {
        try {
            const { name, product } = req.body
            const buy = await this.neo4j.buy(name, product)
            res.status(201).json({
                message: 'buy created successfully',
                buy
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error creating buy',
                error: err
            })
        }
    }
    async getAll(req, res) {
        try {
            const buyers = await this.neo4j.getAllBuyer()
            res.status(200).json({
                message: 'Buyers retrieved successfully',
                buyers
            })
        } catch (err) {
            res.status(500).json({
                message: 'Error retrieving buyers',
                error: err
            })
        }
    }
}


module.exports = new buyerController();

