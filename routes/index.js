var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel=require("./users")
const postModel=require("./post")
const upload=require("./multer")

const localStrategy=require("passport-local")
passport.use(new localStrategy(userModel.authenticate()))


router.get('/', function(req, res, next) {
  res.render('index');
});



router.get('/profile', isLoggedIn,async function(req, res, next) {
  const user=await userModel.findOne({
    username:req.session.passport.user
  })

 .populate('posts')  
 res.render("profile",{user})
});

router.get('/login',function(req, res, next) {

  res.render("login",{error:req.flash('error')})

 });
 router.get('/feed',isLoggedIn,async function(req, res, next) {
  const user =await userModel.findOne({username:req.session.passport.user})
  const posts=await postModel.find()
 .populate("user")
  res.render("feed", {user,posts})

 });

 router.post('/upload', isLoggedIn, upload.single("file"), async function(req, res, next) {
    if(!req.file){
      return res.status(404).send("no file found")

    }

    const user=await userModel.findOne({username:req.session.passport.user})
   const postdata= await postModel.create({
      image: req.file.filename,
      imageText:req.body.filecaption,
      user: user._id
    })

   user.posts.push(postdata._id)
   await user.save()
   res.redirect("/profile")


 });

router.post("/register",(req,res)=>{

  const {username,email,fullname}=req.body
  const userData=new userModel({
   username,email,fullname
  })

  userModel.register(userData,req.body.password)
  .then(()=>{
    passport.authenticate("local")(req,res,()=>{
        res.redirect("/profile")
    })
  })
})

router.post("/login",passport.authenticate("local",{
  successRedirect:"/profile",
  failureRedirect:"/login",
  failureFlash:true
})
,(req,res)=>{}
)

router.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err) return next(err)
    res.redirect("/login")
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next()
  res.redirect("/login")

}


module.exports = router;
