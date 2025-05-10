const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

function initialize(passport) {
  passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) return done(null, false, { message: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  }));

  // Serialize user to session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session (Mongoose 7+ friendly)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
}

module.exports = initialize;
