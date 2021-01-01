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
    isAuth: true,
    isAdmin: req.user.role === 0 ? false : true,
    email: req.user.email,
    image: req.user.image,
    provider: req.user.provider,
    kakaoId: req.user.kakaoId
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

        res.cookie('user_authExp', user.tokenExp)
        res
          .cookie('user_auth', user.token)
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

router.post('/kakao/login', (req, res) => {
  const profile = req.body.profile;
  const tokenData = req.body.response;
  console.log('받은 데이터? ', profile);
  console.log('받은 데이터? ', tokenData);

  User.findOne({ 'provider': 1, 'kakaoId': profile.id }, (err, user) => {
    if (!user) {
      console.log('기존에 로그인 한 적 없음');
      const newUser = new User({
        name: profile.kakao_account.profile.nickname,
        image: profile.properties.profile_image || '',
        provider: 1,
        kakaoId: profile.id,
        connectedAt: profile.connected_at
      });

      newUser.save((err, doc) => {
        if (err) {
          console.error('사용자 정보 저장 실패');
          return res.json({ success: false, message: 'fail to save new user info', err });
        }

        newUser.generateToken((err, user) => {
          if (err) {
            console.error('토큰 발행 실패');
            return res.status(400).json({ success: false, message: 'fail to generate token', err });
          }
  
          // res.cookie('user_authExp', user.tokenExp);
          res
            .status(200)
            .json({ success: true, userId: user._id, user_auth: user.token, user_authExp: user.tokenExp });
        });
      });
    } else {
      console.log('기존에 로그인 한 적 있음');
      user.generateToken((err, user) => {
        if (err) {
          console.error('토큰 발행 실패');
          return res.status(400).json({ success: false, message: 'fail to generate token', err });
        }

        // res.cookie('user_authExp', user.tokenExp);
        res
          .status(200)
          .json({ success: true, userId: user._id, user_auth: user.token, user_authExp: user.tokenExp });
      });
    }
  });
});

router.get('/kakao/logout', auth, (req, res) => {
  User.findOneAndUpdate({ '_id': req.user._id }, { token: '', tokenExp: 0 }, (err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    // res.clearCookie('user_authExp');
    return res.status(200).json({ success: true });
  })
});

module.exports = router;