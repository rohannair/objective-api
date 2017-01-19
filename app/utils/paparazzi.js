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

const putSnapshotImageUrl = () => {
  const host = process.env.PAPARAZZI_HOST
  const scheme = process.env.PAPARAZZI_SCHEME

  return `${scheme}://${host}/image/snapshot`
}
