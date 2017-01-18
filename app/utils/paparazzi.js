'use strict'

let request = require('superagent')

const getImageUrl = async (_, snapshot_id) => {
  // TODO: Clean this up, stop using a stub
  let tempImage = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAACXBIWXMAAAAAAAAAAQCEeRdzAAAA/ElEQVR4nKWVCw4DIQhEvZN34k7cyTtZf2MR0HXbTSbRyLyCC9uQcw7/6HhI5VjrCjCDI3UlmmsNcc0I5qLEsQPKw08AmHkolP1OBiDNJ6OGTPPNr74CZOp1t0es/RJqQEqreZjafpyBsV5iCWQKFlD2LqCsW7wB0Fp/A1QhG+wNACUMSXNdAy5lAKZ2unsbSx8YiMjiqpEA8VLepb+dBfQEhqqaoOM0ykGaIJrvvw/ULgMYspA2exA39Z8AMXLWkFclVICGbC7xAOAvZJpr6w7h/AwYksYrwAkiszv2gQZM3QLkZXrSsS5A3jiEGZFDtAWEYAH1f6F/J8hAPtxaTYVQqUP3AAAAAElFTkSuQmCC'

  const data = `{"filename": "${snapshot_id}.png", "image_data": "${tempImage}"}`

  const response = await request.put('http://localhost:4000/image')
    .set('Content-Type', 'application/json')
    .send(data)

  return response.body.path
}

module.exports = {
  getImageUrl
}
