//  see: https://github.com/jaredhanson/passport-local
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        // compare pw with hash
        bcrypt.compare(password, user.password, (err, res) => {
          if (err) throw err;
          if (res === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};
