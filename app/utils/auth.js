'use strict'
import jwt from 'jsonwebtoken'

/**
 * Token creation has been delegated to Auth0
 */

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
      { audience: process.env.AUTH0_CLIENT_ID, },
      (err, decoded) => {
        if (err) reject(new Error('Could not verify JWT'))
        resolve(decoded)
      })
  })
}
