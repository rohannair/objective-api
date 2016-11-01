'use strict';
const jwt = require('jsonwebtoken');
const omit = require('lodash/omit');

const secret = process.env.JWT_SECRET || new Buffer('abcd1234').toString('base64');

const jwtDetails = {
  algorithm: 'HS256',
  expiresIn: '2d',
  issuer: `qrtrmstr.io`
}

function genToken(userDetails) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { ...omit(userDetails, ['digest', 'img']) },
      secret,
      { ...jwtDetails },
      (err, token) => {
        if (err) reject(new Error('Error creating JWT'));
        resolve(token)
      }
    )
  })
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, { ...jwtDetails }, (err, decoded) => {
      if (err) reject(new Error('Could not verify JWT'));
      resolve(decoded)
    })
  })
}

module.exports = {
  secret,
  genToken,
  verifyToken
}
