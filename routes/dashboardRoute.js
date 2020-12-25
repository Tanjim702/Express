const express = require('express')
const router  = express.Router()

//Middlewares
const {isAuthenticated}= require('../middlewares/authMiddleware')
//Middlewares
router.get('/',isAuthenticated,(req,res,next)=>{
  //Starts 
  res.render('pages/dashboard/dashboard',{
    title:'My dashboard'
  })
  //End 
})
module.exports = router