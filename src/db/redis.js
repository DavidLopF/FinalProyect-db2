const redis = require('ioredis');
const colors = require('colors');

class RedisConection {
    constructor() {
        this.client = this.connect();
    }

    connect() {
        let cliente = new redis({
            host: process.env.DB_HOST,
            port: 6379,
            retryStrategy: (times) => {
                let delay = Math.min(times * 100, 2000);
                return delay;
            },
            maxRetriesPerRequest: 3,
        });

        cliente.on('error', (err) => {
            console.log(colors.red(err));
        });

        return cliente;
    }

    async get(key) {
        return await this.client.get(key);
    }

    async append(key, value) {
        return await this.client.append(key, value);
    }

    async add_listProducts(key, value) {
        try {
            await this.client.set(key, value);
            await this.client.expire(key, 600);
            return true
        } catch (err) {
            console.log(colors.red(err));
            return false
        }
    }

    async delete_shoppingCart(key) {
        try {
            await this.client.del(key);
            return true
        } catch (err) {
            console.log(colors.red(err));
            return false
        }
    }

    async add_shoppingCart(key, shopingcart) {
        try {
            await this.client.set(key, shopingcart);
            await this.client.expire(key, 3600);
            return true
        } catch (err) {
            console.log(colors.red(err));
            return false
        }
    }
}

module.exports = RedisConection;