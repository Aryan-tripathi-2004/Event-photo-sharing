const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync = require("../Utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl,isLoggedIn,validateUserSchema } = require("../Middleware");
const multer  = require('multer');

const UserController = require('../Controllers/User');

const storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/uploads/ProfilePictures')
      },
      filename: function (req, file, cb) {
          // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) 
          cb(null, `${Date.now()}-${file.originalname}`);
      }
    })
    
  const upload = multer({ storage: storage});

router.route('/login')
      .get(UserController.RenderLoginForm)
      .post(saveRedirectUrl,
       passport.authenticate("local",{failureRedirect:'/login',failureFlash: true}), 
       wrapAsync(UserController.UserLogin));

router.post("/SignUp", wrapAsync(UserController.UserSignUp));

router.get("/logout",UserController.UserLogOut);

router.route('/UserProfile')
      .get(isLoggedIn , wrapAsync(UserController.UserProfile))
      .post(isLoggedIn , upload.single('NewUser[ProfilePic]'), wrapAsync(UserController.ChangeProfilePic))
      .put(isLoggedIn , wrapAsync(UserController.UpdateProfile));

router.get("/UserProfile/Edit",isLoggedIn, wrapAsync(UserController.UserProfileEdit));


router.get("/FutureUpdates",wrapAsync(UserController.FutureUpdates));

router.get("/AllImages",wrapAsync(UserController.AllImages));

router.get("/AllVideos",wrapAsync(UserController.AllVideos));

module.exports=router;