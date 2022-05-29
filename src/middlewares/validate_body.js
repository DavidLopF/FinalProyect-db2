const validateRegisterBody = (req, res, next) => {
    const { dni_type, dni, name, cellphone, email, password, address, city, type } = req.body;
    console.log(req.body);

    if (!dni_type || !dni || !name || !cellphone || !email || !password || !address || !city || !type) {
        return res.status(400).json({
            ok: false,
            message: 'Missing data'
        })
    }


    next();
}


const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.render('error', {
            message: 'Llene todos los campos',
            url: '/auth/login'
        })
    }
    
    next();
}


const validateShoppingCart = (req, res, next) => {
    const { shoppingCart} = req.body;

    if (!shoppingCart) {
        return res.status(400).json({
            ok: false,
            message: 'Shopping cart is empty'
        })
    }

    next();
}


module.exports = {
    validateRegisterBody,
    validateLogin,
    validateShoppingCart
}