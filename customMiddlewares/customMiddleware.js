function customMiddleware(req,res,next){
    console.log('Custom middleware')
    next()
}
module.exports = customMiddleware