const validate = require("../middlewares/validate");
const validateBody = require("../middlewares/validate_body");
const validateJWT = require("../middlewares/validate-jwt");

module.exports = {
    ...validate,
    ...validateBody,
    ...validateJWT
}