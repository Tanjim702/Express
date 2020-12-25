const {body} = require('express-validator')
// const User = require('../models/User')

module.exports = [
    body('email')
        .not().isEmpty().withMessage('Email cannot be empty')
        .isEmpty().withMessage('Invalid email'),
    body('password')
        .not().isEmpty().withMessage('Password cannot be empty'),    

]