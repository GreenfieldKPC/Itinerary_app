const request = require('request');

const loggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};
const checkUser = function (req, res, next) {
  if (!loggedIn(req)) {
    res.redirect('/login');
  } else {
    next();
  }
};
const createSession = function (req, res, newUser) {
  return req.session.regenerate(function () {
    req.session.user = newUser;
    res.redirect('/');
  });
};
module.exports = {
  checkUser,
  loggedIn,
  createSession,
}