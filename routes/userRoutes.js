const express = require('express')
//Models
const User = require('../models/User')
//Models


//Utils

const { validationResult, body } = require('express-validator')
const bcrypt = require('bcrypt')
//utils
//Validators
//To be removed

//Tp be removed
const loginValidator = require('../validators/loginValidator')
const signupValidator = require('../validators/signupValidator')
const router = express.Router()
const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logout
} = require('../controllers/userController')
//@SignupGet
router.get('/signup', (req, res, next) => {
    //Starts
    res.render('pages/user/signup', {
        title: 'Create a new account',
        error: {},
        values: {}
    })

    //Ends
})
//@signupPost
router.post('/signup', signupValidator, async (req, res) => {
    //Starts
    let { username, email, password } = req.body
    let errors = validationResult(req).formatWith((err) => err.msg)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/user/signup', {
            title: 'Try again',
            error: errors.mapped(),
            values: { username, email, password }

        })
    }
    try {
        let hashedPassword = await bcrypt.hash(password, 11)
        let user = await new User({ username, email, password: hashedPassword })
        await user.save()
        console.log(`User created successfully`)
        res.render('home', {
            title: 'Signup successfull',

        })
    } catch (error) {
        console.log(error)
    }
    //Ends
})
//@loginGet
router.get('/login', (req, res, next) => {
    //Starts

    res.render('pages/user/login', { title: 'Login page' })
    //Ends
})
//@loginPost
router.post('/login',loginValidator, async (req, res, next) => {
    //Starts
    let { email, password } = req.body
    let errors = validationResult(req).formatWith((err) => err.msg)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        return res.render('pages/user/login', {
            title: 'Try again',
            error: errors.mapped(),
            values: { email, password }

        })
    }
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.json({ msg: 'User not found' })
        }
        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.json({ msg: 'Invalid credentials' })
        }
        console.log('Logged in')
        res.render('home', {
            title: 'login successfull',
            error:{},
            values:{}
        })
    } catch (error) {
        console.log(error)
    }
    //Ends
})
//@logout
router.get('/logout', (req, res, next) => {
    //Starts


    //Ends
})
module.exports = router