'use strict'

let request = require('superagent')
const uuidV4 = require('uuid/v4')

const debug = require('debug')('app:debug')

const getImageUrl = async (image_data) => {
  const data = `{"filename": "${generateUUID()}.png", "image_data": "${image_data}"}`

  const response = await request.put(putImageUrl())
    .set('Content-Type', 'application/json')
    .send(data)

  return response.body.path
}

const generateUUID = () => {
  return uuidV4()
}

const putImageUrl = () => {
  const host = process.env.PAPARAZZI_HOST
  const scheme = process.env.PAPARAZZI_SCHEME

  return `${scheme}://${host}/image`
}

module.exports = {
  getImageUrl
}
