const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const verifyCallback = (req, resolve, reject, check) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
  }
  if (user.role === 'SUPER_ADMIN') {
    // if it is a super admin no matter the route, just give him the access
    req.user = user;
    return resolve();
  }
  // if the user isn't verified keep the access to yourself
  if (check) {
    if (check.includes('verified') && !user.isEmailVerified) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Please verify your email!'));
    }
    if (check.includes('admin') && !user.role !== 'ADMIN') {
      return reject(
        new ApiError(httpStatus.FORBIDDEN, 'Not Authorized!'),
      );
    }
  }
  req.user = user;
  return resolve();
};

const auth = (...check) => async (req, res, next) => new Promise((resolve, reject) => {
  passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, check))(req, res, next);
})
  .then(() => next())
  .catch((err) => next(err));

module.exports = auth;
