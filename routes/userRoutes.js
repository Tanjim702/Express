const express = require('express')
//Models
const User = require('../models/User')
//Models


//Utils
const {isUnauthenticated} = require('../middlewares/authMiddleware')
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
router.get('/signup',isUnauthenticated ,(req, res, next) => {
    //Starts
    res.render('pages/user/signup', {
        title: 'Create a new account',
        error: {},
        values: {}
    })

    //Ends
})
//@signupPost
router.post('/signup', isUnauthenticated,signupValidator, async (req, res) => {
    //Starts
    let { username, email, password } = req.body
    // console.log(password)
    // let errors = validationResult(req).formatWith((err) => err.msg)
    // if (!errors.isEmpty()) {
    //     console.log(errors.mapped())
    //     console.log('Inside errro')
    //     return res.render('pages/user/signup', {
    //         title: 'Try again',
    //         error: errors.mapped(),
    //         values: { username, email, password }

    //     })
    // }
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
router.get('/login', isUnauthenticated,(req, res, next) => {
    //Starts
    console.log(req.session.user)
    res.render('pages/user/login', { title: 'Login page'})
    //Ends
})
//@loginPost
router.post('/login',isUnauthenticated,loginValidator, async (req, res, next) => {
    //Starts
    let { email, password } = req.body
    let errors = validationResult(req).formatWith((err) => err.msg)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        console.log(req.session)
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
        req.session.isLoggedIn = true;
        req.session.user = user
        req.session.save(err=>{
            if(err){
                console.log(err)
                return next(err)
            }
             return res.redirect('/dashboard')
        })
    
    } catch (error) {
        console.log(error)
    }
    //Ends
})
//@logout
router.get('/logout', (req, res, next) => {
    //Starts
    req.session.destroy(err=>{
        if(err){
            console.log(err);
            return next()
        }
        return res.redirect('/user/login')
    })

    //Ends
})
module.exports = router