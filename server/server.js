const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const bodyParser = require('body-parser');
const User = require('./models/user');
require('dotenv').config();

// =====================================================================
// MONGO CONNECTION
const connectDb = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Mongo connected at ${conn.connections[0].host}`);
};
connectDb();

const app = express();
// =====================================================================
// MIDDLEWARES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  session({
    secret: 'secretcode',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./services/passport')(passport);

// =====================================================================
// ROUTES
app.get('/', (req, res) => res.send('Hello'));
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ message: 'No User Exists' });
    }
    req.login(user, (err) => {
      if (err) return next(err);
      res.json({ message: 'Successfully Logged In', user });
    });
  })(req, res, next);
});
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      username: username,
    }).exec();
    if (user) {
      res.json({ message: 'User Already Exists' });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        username: username,
        password: hashedPassword,
      });
      await newUser.save();
      res.json(newUser);
    }
  } catch (error) {
    console.log(error);
  }
});
app.get('/user', (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.json({ message: 'No User Logged In' });
  }
});
app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged Out' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
