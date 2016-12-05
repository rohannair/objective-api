'use strict';
import bcrypt from 'bcrypt';
const saltRounds = 10;

// Async function to encrypt a password, given the password and a saltRound value
const encryptPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });

// password is the password supplied by the user at the login screen
// dbHash is the hashed password in the database
// returns a boolean depending on the match
const checkPassword = (password, dbHash) =>
  new Promise((resolve) => {
    bcrypt.compare(password, dbHash, (err, res) => {
      if (err || !res) return resolve(false);
      resolve(true);
    });
  });

const randomPassword = length =>
  Promise.resolve(Math.random().toString(36).slice(-length));

const isAdmin = role => {
  if (role === 'user') return Promise.reject(false);
  Promise.resolve(true);
};

module.exports = {
  encryptPassword,
  checkPassword,
  randomPassword,
  isAdmin
};
