'use strict';
import uuid from 'node-uuid';

module.exports.addId = val => ({ id: uuid.v4(), ...val });
