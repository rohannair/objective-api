'use strict'

import request from 'superagent'

export const putSnapshotImage = async (image_data) => {
  if (!image_data) return undefined
  const data = `{"image_data": "${image_data}"}`

  const response = await request.put(putSnapshotImageUrl())
    .set('Content-Type', 'application/json')
    .send(data)

  return response.body.path
}

export const putAvatarImage = async (image_data, user_id) => {
  if (!image_data) return undefined
  const data = `{"image_data": "${image_data}", "user_id": "${user_id}"}`

  const response = await request.put(putAvatarImageUrl())
    .set('Content-Type', 'application/json')
    .send(data)

  return response.body.path
}

const putAvatarImageUrl = () => {
  return `${getPaparazziHost()}/image/avatar`
}

const putSnapshotImageUrl = () => {
  return `${getPaparazziHost()}/image/snapshot`
}

const getPaparazziHost = () => {
  const host = process.env.PAPARAZZI_HOST
  const scheme = process.env.PAPARAZZI_SCHEME

  return `${scheme}://${host}`
}
