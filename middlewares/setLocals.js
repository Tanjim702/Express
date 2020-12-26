module.exports = () =>{

    //res.locals can be acccessed directly via the template enginr
    return (req,res,next)=>{
        res.locals.user = req.session.user
        res.locals.isLoggedIn = req.session.isLoggedIn;
        next()
    }
}