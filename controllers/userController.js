
const User = require('../models/User')
//Utils
const Flash = require('../utils/Flash')
const { validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
//utils
exports.signupPostController = async (req, res, next) => {
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
        req.flash('success', 'User created successfully')
        console.log(`User created successfully`)
        res.render('home', {
            title: 'Signup successfull',
            flashMessage: Flash.getMessage(req)


        })
    } catch (error) {
        console.log(error)
    }
    //Ends
}
exports.signupGetController = (req, res, next) => {
    //Starts
    res.render('pages/user/signup', {
        title: 'Create a new account',
        error: {},
        values: {},
        flashMessage: Flash.getMessage(req)
    })

    //Ends
}
exports.loginGetController = (req, res, next) => {
    //Starts
    console.log(req.session.user)
    res.render('pages/user/login', {
        title: 'Login page', flashMessage: Flash.getMessage(req)
    })
    //Ends
}
exports.loginPostController = async (req, res, next) => {
    //Starts
    let { email, password } = req.body
    let errors = validationResult(req).formatWith((err) => err.msg)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        console.log(req.session)
        return res.render('pages/user/login', {
            title: 'Try again',
            error: errors.mapped(),
            values: { email, password },
            flashMessage: Flash.getMessage(req)


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
        req.session.save(err => {
            if (err) {
                console.log(err)
                return next(err)
            }
            return res.redirect('/dashboard/create-profile')
        })

    } catch (error) {
        console.log(error)
    }
    //Ends
}
exports.logout = (req, res, next) => {
    //Starts
    req.session.destroy(err => {
        if (err) {
            console.log(err);
            return next()
        }
        return res.redirect('/user/login')
    })

    //Ends
}