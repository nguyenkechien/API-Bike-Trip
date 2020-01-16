const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Users = mongoose.model('users');

passport.use(new LocalStrategy({
  usernameField: 'users[email]',
  passwordField: 'users[password]'
}, async (email, password, done) => {
  let user = await Users.findOne({ email: email });

  try {
    if (!user || user.validPassword(password)) {
      return done(null, false, { errors: { 'email or password': 'is invalid' } });
    }
    return done(null, user);
  } catch (done) { }

}))

module.exports = passport;