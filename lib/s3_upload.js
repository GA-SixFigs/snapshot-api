require('dotenv').config()
const AWS = require('aws-sdk')
const s3 = new AWS.S3()
// Read the file elsewhere, accept it here
module.exports = function (file) {
  const uploadParams = {
    Bucket: 'zoomies-snapshot-bucket',
    Key: file.originalname,
    Body: file.buffer
  }
  return s3.upload(uploadParams).promise()
}
