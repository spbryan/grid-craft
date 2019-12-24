/********************************
 * Routes for User resources
 * 
 * @author Sean Bryan
 * 
 * 2019-10-12
 ********************************/

const router = require("express").Router();
const passport = require('passport');
const userController = require("../../controllers/userController");

// Matches with "/api/users/register"
router.route("/register")
  .post(passport.authenticate('local-signup'), function (req, res) {
    console.log(req.user);
    res.json(req.user);
  });


// Matches with "/api/users/login"
router.route("/login")
  // if we fail to authenticate then passport will respond with a 401 unauthorized status
  .post(passport.authenticate('local-signin'), function (req, res) {
    console.log(req.user);
    res.json(req.user);
  });

module.exports = router;
