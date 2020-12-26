const express = require('express')
const router  = express.Router()
const Profile = require('../models/Profile')

//Middlewares
const {isAuthenticated}= require('../middlewares/authMiddleware')
//Middlewares
router.get('/',isAuthenticated,async(req,res,next)=>{
  //Starts 
  try {
    let profile = await Profile.findOne({user:req.session.user._id})
    if(profile){
      return res.render('pages/dashboard/dashboard',{
        title:'My dashboard',
        flashMessage:{}
      })
    }
  } catch (error) {
    console.log(error)
  }

  //End 
})

router.get('/create-profile', async(req,res,next)=>{
  //Starts
  try {
    let profile = await Profile.findOne({user:req.user._id})
    if(profile){
      return res.redirect('/dashboard/edit-profilr')
    }

    res.render('pages/dashboard/create-profile',{
      title:'Create your profile',
      flashMessage:{}
    })
  } catch (error) {
    
  }
  //Ends
})
router.post('/create-profile',(req,res,next)=>{
  //Starts
  //Ends
})
router.get('/edit-profile', async(req,res,next)=>{
  //Starts
  //Ends
})
router.post('/edit-profile',(req,res,next)=>{
  //Starts
  //Ends
})
module.exports = router