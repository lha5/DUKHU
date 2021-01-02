const express = require('express');
const router = express.Router();
const axios = require('axios');

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

router.post('/kakao/login', async (req, res) => {
  const code = req.body.current;
  console.log('받은 데이터? ', code);

  const hostName = 'https://kauth.kakao.com/oauth/token';
  const grantType = 'grant_type=authorization_code';

  const tokenInfo = await axios
  .post(
    `${hostName}?${grantType}&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`,
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
    .then(response => {
      console.log('카카오 로그인 토큰 발급 응답 값?? ', response.status, response.data);
      if (response.status === 200) {
        console.log('카카오 로그인 토큰 발급 성공:: ', response.data);
        return response.data;
      } else {
        return res.status(500).json({ result: false });
      }
    })
    .catch(error => {
      console.log('토큰 요청 에러 ---------------------------');
      if (error.response) {
        console.error(
          '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.',
          );
        // console.error('error?? ', error.response.data);
        console.error('error?? ', error.response.status);
        // console.error('error?? ', error.response.headers);
      } else if (error.request) {
        console.error('요청이 이루어 졌으나 응답을 받지 못했습니다.');
        console.error('error?? ', error.request);
      } else {
        console.error(
          '오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.',
        );
        console.error('error', error.message);
      }
      console.error(error.config);
      return res.status(error.response.status).json({ result: false });
    });
  
  console.log('카카오 토큰 정보?? ', tokenInfo);
        
  // let profile = {};
  // const getConfig = {
  //   headers: { Authorization: `Bearer ${tokenInfo.access_token}` }
  // };
  // if (tokenInfo) {
  //   await axios
  //     .get(`https://kapi.kakao.com/v2/user/me`, getConfig)
  //     .then(response => {
  //       console.log('카카오 로그인 사용자 정보 가져오기 응답 값?? ', response.status, response.data);
  //       if (response.status === 200) {
  //         console.log('카카오 로그인 사용자 정보 가져오기 완료:: ', response.data);
  //         profile = response.data;
  //       } else {
  //         return res.status(500).json({ result: false });
  //       }
  //     })
  //     .catch(error => {
  //       console.log('프로필 요청 에러 ---------------------------');
  //       if (error.response) {
  //         console.error(
  //           '요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.',
  //           );
  //           console.error('error?? ', error.response.data);
  //           console.error('error?? ', error.response.status);
  //           console.error('error?? ', error.response.headers);
  //         } else if (error.request) {
  //           console.error('요청이 이루어 졌으나 응답을 받지 못했습니다.');
  //           console.error('error?? ', error.request);
  //         } else {
  //           console.error(
  //             '오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.',
  //           );
  //           console.error('error', error.message);
  //         }
  //         console.error(error.config);
  //         return res.status(error.response.status).json({ result: false });
  //     });
  // }

  // User.findOne({ 'provider': 1, 'kakaoId': profile.id }, (err, user) => {
  //   if (!user) {
  //     console.log('기존에 로그인 한 적 없음');
  //     const newUser = new User({
  //       name: profile.kakao_account.profile.nickname,
  //       email: profile.kakao_account.email || '',
  //       image: profile.properties.profile_image || '',
  //       provider: 1,
  //       kakaoId: profile.id,
  //       connectedAt: profile.connected_at
  //     });

  //     newUser.save((err, doc) => {
  //       if (err) {
  //         console.error('사용자 정보 저장 실패');
  //         return res.json({ success: false, message: 'fail to save new user info', err });
  //       }

  //       newUser.generateToken((err, user) => {
  //         if (err) {
  //           console.error('토큰 발행 실패');
  //           return res.status(400).json({ success: false, message: 'fail to generate token', err });
  //         }
  
  //         // res.cookie('user_auth', user.token);
  //         // res.cookie('user_authExp', user.tokenExp);
  //         res
  //           .status(200)
  //           .json({ success: true, userId: user._id, user_auth: user.token, user_authExp: user.tokenExp });
  //       });
  //     });
  //   } else {
  //     console.log('기존에 로그인 한 적 있음');
  //     user.generateToken((err, user) => {
  //       if (err) {
  //         console.error('토큰 발행 실패');
  //         return res.status(400).json({ success: false, message: 'fail to generate token', err });
  //       }

  //       // res.cookie('user_auth', user.token);
  //       // res.cookie('user_authExp', user.tokenExp);
  //       res
  //         .status(200)
  //         .json({ success: true, userId: user._id, user_auth: user.token, user_authExp: user.tokenExp });
  //     });
  //   }
  // });
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