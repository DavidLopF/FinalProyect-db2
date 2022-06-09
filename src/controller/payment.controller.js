const db = require('../models/index');


class PaymentController {
    constructor(paymentsService) {
        this.user = db.User;
        this.buyer = db.Buyer;
        this.card = db.Card;
        this.payment = db.Payment;
    }

    async getPaymentsToken(req, res) {
        const user = req.user;
        let buyer = await this.buyer.findOne({
            where: { user_id: user.uid },
            include: [{
                model: this.user,
                as: 'user',
                attributes: ['id', 'full_name', 'email']
            }]
        });
        buyer = buyer.dataValues;
        buyer.user = buyer.user.dataValues;
        delete buyer.user_id
        let cards = await this.card.findAll({
            where: { buyer_id: buyer.id },
        });
        cards = cards.map(card => card.dataValues);
        let payments = [];
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            let payment = await this.payment.findAll({
                where: { card_id: card.id },
                include: [{
                    model: this.card,
                    as: 'card',
                    attributes: ['id', 'name_card', 'number']
                }]
            });
            payment = payment.map(pay => pay.dataValues);
            payments.push(payment);

        }
        payments = payments[0];
        res.status(200).json({
            buyer,
            payments
        })




    }
}

module.exports = new PaymentController();