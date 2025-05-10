const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const router = express.Router();

// GET: Show login form
router.get('/login', (req, res) => {
  res.render('login'); // views/login.ejs
});

// GET: Show registration form
router.get('/register', (req, res) => {
  res.render('register'); // views/register.ejs
});

// POST: Handle registration
router.post('/register', async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    // Check for duplicate username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('error', 'Username already taken');
      return res.redirect('/register');
    }

    // Create new user and hash handled in `userSchema.pre('save')`
    const user = new User({ username, password, role });
    await user.save();

    // Log the user in immediately
    req.login(user, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome!');
      res.redirect('/');
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Registration failed');
    res.redirect('/register');
  }
});


// POST: Handle login
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true
}), (req, res) => {
  req.flash('success', 'Welcome back!');
  res.redirect('/');
});

// GET: Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash('success', 'Logged out');
    res.redirect('/');
  });
});

module.exports = router;
