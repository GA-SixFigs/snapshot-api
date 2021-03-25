const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const Picture = require('../models/picture')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404





const router = express.Router()

const s3Upload = require('../../lib/s3_upload')

router.post('/pictures', upload.single('picture'), (req, res, next) => {
  console.log(req.file, "this is my file in the router post", req.body, "the body", req.data, "the data")
  s3Upload(req.file)
    .then(awsFile => {
      console.log(awsFile)
      return Picture.create({ url: awsFile.Location })
    })
  //  req.body => { upload: { url: 'www.blank.com' } }
    .then(pictureDoc => {
      res.status(201).json({ picture: pictureDoc })
    })
    .catch(next)
})



//

// this would just get picture data
// INDEX aka GET all
router.get('/pictures', (req, res, next) => {
  Picture.find()
    .then(pictures => {
      return pictures.map(picture => picture.toObject())
    })
    .then(pictures => res.status(200).json({ pictures: pictures }))
    .catch(next)
})


//

// // SHOW aka get by id
router.get('/pictures/:id', (req, res, next) => {
  console.log(req)
  Picture.findById(req.params.id)
    .then(handle404)
    .then(picture => res.status(200).json({ picture: picture.toObject() }))
    .catch(next)
})
//
// // CREATE aka post
// router.post('/pictures', requireToken, (req, res, next) => {
//   req.body.picture.owner = req.user.id
//
//   picture.create(req.body.picture)
//
//     .then(picture => {
//       res.status(201).json({ picture: picture.toObject() })
//     })
//     .catch(next)
// })
//
// // UPDATE aka find by id and UPDATE a single post
// router.patch('/pictures/:id', requireToken, removeBlanks, (req, res, next) => {
//   delete req.body.picture.owner
//
//   picture.findById(req.params.id)
//     .then(handle404)
//     .then(picture => {
//       requireOwnership(req, picture)
//
//       return picture.updateOne(req.body.picture)
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })
//
// // DELETE
// router.delete('/pictures/:id', requireToken, (req, res, next) => {
//   picture.findById(req.params.id)
//     .then(handle404)
//     .then(picture => {
//       requireOwnership(req, picture)
//       picture.deleteOne()
//     })
//     .then(() => res.sendStatus(204))
//     .catch(next)
// })

module.exports = router
