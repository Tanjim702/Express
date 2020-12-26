const express = require('express')


const router = express.Router()
//Validators
const { isUnauthenticated } = require('../middlewares/authMiddleware')
const loginValidator = require('../validators/loginValidator')
const signupValidator = require('../validators/signupValidator')
//Validators
const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logout
} = require('../controllers/userController')
//@SignupGet
router.get('/signup', isUnauthenticated, signupGetController)
//@signupPost
router.post('/signup', isUnauthenticated, signupValidator, signupPostController)
//@loginGet
router.get('/login', isUnauthenticated, loginGetController)
//@loginPost
router.post('/login', isUnauthenticated, loginValidator, loginPostController)
//@logout
router.get('/logout', logout)
module.exports = router