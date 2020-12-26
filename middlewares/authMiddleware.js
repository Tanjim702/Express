const User = require('../models/User')
exports.bindUserWithRequest = ()=>{
    return async (req,res,next)=>{
        if(!req.session.isLoggedIn){
            console.log('From auth moddleware', req.session.user)
            return next()
        }
        try {
            let user =await User.findById(req.session.user._id)
            req.user = user
            return next()
        } catch (error) {
            console.log(error)
            return next(error)
        }

    }
}
exports.isAuthenticated = (req,res,next)=>{
    if(!req.session.isLoggedIn){
        return res.redirect('/user/login')
    }
    return next()
}
exports.isUnauthenticated = (req,res,next)=>{
    if(req.session.isLoggedIn){
        return res.redirect('/dashboard')
    }
    return next()
}