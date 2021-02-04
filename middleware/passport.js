const passport = require('passport');
const authModel = require("../model/authModel");
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const _ = require('lodash');

passport.serializeUser((user,done) => {
    done(null,user);
})

passport.deserializeUser((user,done) => {
    done(null, user);
});

//google oauth2 strategy
passport.use('google', new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:8000/api/v1/google/auth/linked/callback',
    passReqToCallback: true
}, async (req, accessToken, refreshToken, profile, done) => {
    try {
        const existsUser = await authModel.findByEmail(profile.email);
        const data = { email: profile.email, position_id: 5 };
        if(!_.isEmpty(existsUser)){
            return done(null, existsUser);
        }
        const newUser = await authModel.create(data);
        const response = [{id: newUser.insertId}];
        return done(null, response);
    }catch(err){
        return done(err,null);
    }
}))