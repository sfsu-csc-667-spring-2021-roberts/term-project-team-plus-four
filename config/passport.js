const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//TODO: Figure our the database set up. 
const connection = require('../db/index');
//const User = connection.models.User;


//custom fields will let passport know what to look for in db
const customFields ={
    usernameField: 'firstname',
    passwordField: 'password',
}

//checking database (April 7: config to mongodb will config to postgres)
const verifyCallback = (username, password, callback) => {

    User.findOne({ username: username })
        .then((user) => {
            if (!user) {return callback(null, false) }

            //TODO validatePassword
            const isValid = true;

            if (isValid){
                return callback(null, user);
            } else {
                return callback(null, false);
            }
        })
        .catch((err) => {
            callback(err);
        });

};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);
