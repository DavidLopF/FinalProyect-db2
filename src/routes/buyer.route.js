const { Router } = require('express');
const router = Router();
const buyerController = require('../controller/buyer.controller');



router.route('/')
    .post((req, res) => {
        buyerController.create(req, res);
    })


module.exports = router;