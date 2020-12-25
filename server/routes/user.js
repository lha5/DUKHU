const express = require('express');
const router = express.Router();

const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

// -------------------------
//          User
// -------------------------

router.get('/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    name: req.user.name,
    isAdmin: req.user.role === 0 ? false : true,
    email: req.user.email,
    image: req.user.image
  });
});

router.post('/signup', (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err })
    };

    return res.status(200).json({ success: true });
  });
});

router.post('/signin', (req, res) => {
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if (!user) {
      return res.json({ success: false, message: 'no email exists' });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({ success: false, message: 'wrong password' });
      }

      user.generateToken((err, user) => {
        if (err) {
          return res.status(400).send(err);
        }

        res
          .cookie('dukhu_auth', user.token)
          .status(200)
          .json({ success: true, userId: user._id });
      });
    });
  });
});

router.get('/logout', auth, (req, res) => {
  User.findOneAndUpdate({ '_id': req.user._id }, { 'token': '', 'tokenExp': 0 }, function (err, user) {
    if (err) {
      return res.json({ success: false, err });
    }
    
    return res.status(200).send({ success: true });
  });
});

router.post('/kakao/login', (req, res) => {});

router.get('/kakao/logout', (req, res) => {});

module.exports = router;