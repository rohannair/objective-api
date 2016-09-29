const bcrypt = require('bcrypt');
const saltRounds = 10;

// Async function to encrypt a password, given the password and a saltRound value
function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err !== undefined) return reject(err);
      resolve(hash);
    });
  });
}

// password is the password supplied by the user at the login screen
// dbHash is the hashed password in the database
// returns a boolean depending on the match
function checkPassword(password, dbHash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, dbHash, (err, res) => {
      if (err !== undefined) return resolve(false);
      resolve(res);
    });
  })
}

module.exports = {
  encryptPassword: encryptPassword,
  checkPassword: checkPassword
};
