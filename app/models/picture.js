const mongoose = require('mongoose')

const pictureSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamp: true
})

module.exports = mongoose.model('Picture', pictureSchema)
