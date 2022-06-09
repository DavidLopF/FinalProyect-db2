const neo4j = require('neo4j-driver')

class Neo4j {
    constructor() {
        this.driver = neo4j.driver(process.env.DB_URL, neo4j.auth.basic(process.env.DB_USER_G, process.env.DB_PASS_G))
        this.session = this.driver.session()
    }

    recommendProduct(name, product) {
        return this.session.run(`MATCH (product:product{name: '${product}'}) MATCH (buyer:buyer{name: '${name}'}) create (buyer)-[:recommend]->(product)`)
    }

    buy(name, product) {
        return this.session.run(`MATCH (n:buyer {name: '${name}'}) MATCH (m:product {name: '${product}'}) CREATE (n)-[:buy]->(m)`)
    }

    getAllBuyer() {
        return this.session.run('MATCH (n:buyer) RETURN n')
    }

    getBuyerByName(name) {
        return this.session.run(`MATCH (n:buyer {name: '${name}'}) RETURN n`)
    }

    async createSeller(id, name) {
        let session = this.driver.session()
        try {
            const query = await session.run(`CREATE (n:seller {seller_id: '${id}', name: '${name}'}) RETURN n`)
            session.close()
            return query
        } catch (e) {
            session.close()
            console.log(e)
        }
    }

    async createBuyer(id, name) {
        let session = this.driver.session()
        try {
            const query = await session.run(`CREATE (n:buyer {id: '${id}', name: '${name}'}) RETURN n`)
            session.close()
            return query
        } catch (e) {
            session.close()
            console.log(e)
        }
    }

    findSellerByName(name) {
        return this.session.run(`MATCH (n:seller {name: '${name}'}) RETURN n`)
    }

    async createProduct(name, category_id, seller) {
        let session = this.driver.session()
        try {
            let product = await session.run(`CREATE (n:product {name: '${name}', category_id: '${category_id}'}) RETURN n`)
            await session.run(`MATCH (n:seller {seller_id: '${seller}'}), (m:product {name: '${name}'}) CREATE (n)-[:sells]->(m) RETURN n`)
            return product.records[0]._fields[0].properties
        } catch (e) {
            console.log(e)
            session.close()
        }
    }

    top5Products() {
        return this.session.run(`
        MATCH (buyer:buyer)
        MATCH (product:product)
        MATCH (buyer)-[:buy]->(product)
        RETURN product.name, count(*)
        ORDER BY count(*) DESC
        LIMIT 5
        `)
    }

    buy(name, product) {
        let session = this.driver.session()
        try {
            const query = session.run(`MATCH (n:buyer {name: '${name}'}) MATCH (m:product {name: '${product}'}) CREATE (n)-[:buy]->(m)`)
            session.close()
            return query
        } catch (e) {
            session.close()
            console.log(e)
        }
    }
    async getALlProducts() {
        let products = await this.session.run(`
        MATCH (buyer:buyer)
        MATCH (product:product)
        MATCH (buyer)-[:buy]->(product)
        RETURN product.name, count(*)
        ORDER BY count(*) DESC
        `)
        products = products.records.map(product => {
            return {
                name: product._fields[0],
                sales: product._fields[1].low
            }
        })
        return products
    }

    async isRecommended(product) {
        let session = this.driver.session()
        const recomendated = await session.run(`
        MATCH (buyer:buyer)
        MATCH (product:product)
        MATCH (buyer)-[:recommend]->(product)
        WHERE product.name = '${product}'
        RETURN true
        `)
        session.close()
        return recomendated.records[0]
    }
}


module.exports = new Neo4j();
