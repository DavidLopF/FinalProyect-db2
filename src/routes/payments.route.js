const Router = require("express")
const router = Router();
const paymentController = require("../controller/payment.controller");
const { validateJWT } = require("../middlewares/validate-jwt");

router.route("/")
    .get([validateJWT], (req, res) => {
        paymentController.getPaymentsToken(req, res);
    })

router.route('/view/:id')
    .get((req, res) => {
        paymentController.getPaymentsView(req, res);
    })


module.exports = router;