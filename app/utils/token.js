'use strict';
const ApiError = Error;
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'abcd1234';

// Function to generate a JWT, with the user details to be included as the payload
function genToken(userDetails) {
  return new Promise((resolve, reject) => {
    jwt.sign(Object.assign({}, userDetails), SECRET,
      {
        algorithm: 'HS256',
        expiresIn: 5184000,
        audience: 'user',
        issuer: 'qrtrmstr',
        subject: 'user-token'
      },
      (err, decoded) => {
        if(err) reject(new ApiError('Error creating JWT', 500, err));
        resolve (decoded);
      });
  });
}

// Function to verify an incoming JWT
function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET,
      {
        algorithm: 'HS256',
        audience: 'user',
        issuer: 'qrtrmstr',
        subject: 'user-token',
        clockTolerance: 60
      },
      (err, decoded) => {
        if(err) reject (new ApiError('JWT can not be verified', 401, err));
        resolve(decoded);
      });
  });
}

module.exports = {
  genToken: genToken,
  verifyToken: verifyToken
};
