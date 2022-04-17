const express = require("express");
const router = express.Router();
const passport = require("passport")
router.use(passport.initialize())
const { jwtStrategy } = require("../jwt-config.js") 
passport.use("login", jwtStrategy)

//for getting the current logged in user's information 

router.get("/myinfo", 
    passport.authenticate('login', {session: false}), 
    (req, res) => {
        res.json({
        success: true,
        user: req.user,
        status:
          "User has been logged in successfully",
      })
})

module.exports = router; 