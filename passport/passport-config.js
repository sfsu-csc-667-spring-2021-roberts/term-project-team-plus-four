const localStrategy = require('passport-local').Strategy
const bcrypt = require("bcrypt")

function initializePassport(passport, getUserByEmail, getUserById){
    
    const authenticateUser = async (email, password, done) => { 
        
        const user = getUserByEmail(email)

        if (!user) {
            return done(null, false, { message: 'Email not registered'})
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'password incorrect'})
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new localStrategy({usernameField: 'email'}, authenticateUser))
    passport.serializeUser((user,done) => done(null, user.id))
    passport.deserializeUser((id,done) => {
        return done(null, getUserById(id))})

}

module.exports = initializePassport