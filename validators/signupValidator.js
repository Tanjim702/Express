const {body} = require('express-validator')
const User = require('../models/User')
module.exports = signupValidator = [
    body('username')
        .isLength({ min: 2, max: 30 }).withMessage('Username must be between 2 to 30 characters')
        .custom(async name => {
            let user = await User.findOne({ username: name })
            if (user) {
                return Promise.reject('Username already exists')
            }
        })
        .trim(),
    body('email')
        .isEmail().withMessage('Please provide a valid email')
        .custom(async email => {
            let emailv = await User.findOne({ email })
            if (emailv) {
                return Promise.reject('Email already in use')
            }
        })
        .normalizeEmail(),
    body('password')
        .isLength({ min: 5 }).withMessage('Your password must be greater than 5 characters')
        .custom((password, { req }) => {
            if (password !== req.body.confirmPassword) {
                throw new Error('Passwords doesn\'t match')
            }
        })

]