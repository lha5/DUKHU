const { User } = require('../models/User');

let auth = (req, res, next) => {
  let token = req.headers.authorization;
  token = token.split(' ')[1];
  console.log('사용자 인증 토큰:: ', token);

  User.findByToken(token, function (err, user) {
    if (err) {
      throw err;
    }
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };