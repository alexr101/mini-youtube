var mongoose = require("mongoose");
var User = mongoose.model("User");
var LocalStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt-nodejs");

module.exports = function(passport){
    
    //Serialize users
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    //Deserialize users
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
    
    //Login Verification
    passport.use("login", new LocalStrategy({
        passReqToCallback : true
    },  function(req, username, password, done){

            User.findOne({'username': username}, function(err, user){
                //Validation errors
                if(err){
                    req.flash('error', err);
                    return done(err);
                }
                if(!user){
                    req.flash('error', 'Username is incorrect');
                    return done(null, false);
                }
                if(!password){
                    req.flash('error', 'Please enter a password :)');
                    return done(null, false);
                }
                if(!isValidPassword(user, password)){
                    req.flash('error', 'Password is incorrect');
                    return done(null, false);
                }
                //Login successful
                var successMsg = "Hello, " + user.username; 
                req.flash('success', successMsg);
                
                return done(null, user);
            });
        }
    ));
    
    //Signup verification
    passport.use("signup", new LocalStrategy({
        passReqToCallback : true
    },  function(req, username, password, done){
            User.findOne({"username": username}, function(err, user){
                //Validation Errors
                if(err){
                    req.flash('error', err);
                    return done(err);
                }
                if(user){
                    req.flash('error', 'User already exists');
                    return done(null, false);
                }
    			
    			//create new user object with req.body received from registration form
                var newUser = {
                    username: username,
                    username_lower: username.toLowerCase(),
                    password: createHash(password),
                    slogan: req.body.slogan,
                    email: req.body.email,
                    about: req.body.about,
                    gender: req.body.gender,
                    city: req.body.city,
                    state: req.body.state,
                    phone: "970-319-6198",
                    profile_image: req.body.profileImage,
                    header_image: req.body.headerImage,
                    header_position: req.body.headerPosition,
                    payment:[
                        { 
                            card_type: "Visa",
                            card_number: createHash(1234567812345678),
                            card_last_four: 5678,
                            exp_month: "Aug",
                            exp_year: 2015,
                            cvc: "111"
                        }
                    ]
                };
                
                //create user base on newUser
                User.create(newUser, function(err, user){
                    if(err){
                        console.log(err);
                        return done(err);
                    }
                    return done(null, user);
                });
            });
        }
    ));
    
    //Compares the regular text password the user just submitted for login with
    //the hash password stored in the user account
    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
    //encrypt new passwords
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
};