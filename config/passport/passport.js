/********************************
  * Config for passport strategy
  * 
  * @author Sean Bryan
  * 
  * 2019-10-12
  ********************************/

var bCrypt = require('bcrypt-nodejs');

module.exports = function (passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //serialize
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // deserialize user 
    passport.deserializeUser(function (id, done) {
        User.find({
            _id: id
            // where: {
            //     id: id
            // }
        }).then(function (user) {
            if (user) {
                done(null, user);
            } else {
                done(user.errors, null);
            }
        }).catch(function (err) {
            console.log('error: ', err);
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            var generateHash = function (password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };

            User.find({
                email: email
            }).then(function (user) {
                // if (user) {
                if (!isEmpty(user)) {
                    console.log("that email is already taken");
                    return done(null, false, {
                        message: 'That email is already taken'
                    });
                } else {
                    var userPassword = generateHash(password);
                    var data =
                    {
                        email: email,
                        password: userPassword
                    };
                    User.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }
                        if (newUser) {
                            return done(null, newUser);
                        }
                    });
                }
            });
        }

    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            var User = user;
            var isValidPassword = function (userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            console.log(" in local -signin ", + password);
            User.findOne({
                email: email
            }).then(function (user) {
                if (!user) {
                    console.log('for login could not find email matching this email ' + email);
                    return done(null, false, {
                        message: 'Email does not exist'
                    });
                }

                if (!isValidPassword(user.password, password)) {
                    console.log('Password in not valid in passport.js bjt ');
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                console.log(JSON.stringify(user));
                var userinfo = user;
                // var userinfo = user.get();
                return done(null, userinfo);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
}

function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}