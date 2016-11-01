'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Async function to encrypt a password, given the password and a saltRound value
const encryptPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      resolve(hash);
    });
  });

// password is the password supplied by the user at the login screen
// dbHash is the hashed password in the database
// returns a boolean depending on the match
const checkPassword = (password, dbHash) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, dbHash, (err, res) => {
      if (err) return resolve(false);
      resolve(res);
    });
  });

const randomPassword = length =>
  Promise.resolve(Math.random().toString(36).slice(-length));

const isAdmin = role =>
  new Promise((resolve, reject) => {
    if (role === 'user') return reject(false);
    resolve(true);
  });

module.exports = {
  encryptPassword,
  checkPassword,
  randomPassword,
  isAdmin
};
