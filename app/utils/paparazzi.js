'use strict'

let request = require('superagent')
const uuidV4 = require('uuid/v4')

const debug = require('debug')('app:debug')

const getImageUrl = async (image_data) => {
  const data = `{"filename": "${generateUUID()}.png", "image_data": "${image_data}"}`

  const response = await request.put('http://localhost:4000/image')
    .set('Content-Type', 'application/json')
    .send(data)

  return response.body.path
}

const generateUUID = () => {
  return uuidV4()
}

module.exports = {
  getImageUrl
}
