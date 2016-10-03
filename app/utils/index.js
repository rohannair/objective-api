const uuid = require('node-uuid');

module.exports.addId = val => ({ id: uuid.v4(), ...val });
