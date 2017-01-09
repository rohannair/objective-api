'use strict'
import uuid from 'node-uuid'
import crypto from 'crypto'

export const addId = val => ({ id: uuid.v4(), ...val })
export const createRandomToken = () => Promise.resolve(crypto.randomBytes(12).toString('hex'))
