const express = require('express');
const router = express.Router();

const { User } = require('../models/User');

// -------------------------
//          User
// -------------------------

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

module.exports = router;