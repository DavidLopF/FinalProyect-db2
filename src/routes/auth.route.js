const { Router } = require("express");
const router = Router();
const { ValidateUniqueUser, existUser } = require("../helpers/db-validators");
const { validateData, validateRegisterBody, validateLogin } = require("../middlewares/export");
const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

//____________________________________Imports__________________________________________


router.post("/register", [
    ValidateUniqueUser,
    validateRegisterBody,
    validateData
], (req, res) => {
    authController.register(req, res);
})

router.post("/login", [
    existUser,
    validateLogin,
    validateData
], (req, res) => {
    authController.login(req, res);
})


router.get('/register', (req, res) => {
    authController.getViewRegister(req, res);
})
router.get('/login', (req, res) => {
    authController.getViewLogin(req, res);
})

module.exports = router;


