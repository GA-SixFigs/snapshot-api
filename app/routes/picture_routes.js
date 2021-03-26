const express = require('express')
const passport = require('passport')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })
const Picture = require('../models/picture')
const User = require('../models/user')

const requireToken = passport.authenticate('bearer', { session: false })
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership

const router = express.Router()

const s3Upload = require('../../lib/s3_upload')

router.post('/pictures', requireToken, upload.single('picture'), (req, res, next) => {
  console.log(req.file, "this is my file in the router post", req.body, "the body", req.user, "")
  s3Upload(req.file)
    .then(awsFile => {
      console.log(awsFile)
      return Picture.create({ url: awsFile.Location, owner: req.user._id, caption: req.body.caption, tag: req.body.tag })
    })
  //  req.body => { upload: { url: 'www.blank.com' } }
    .then(pictureDoc => {
      res.status(201).json({ picture: pictureDoc })
      console.log(pictureDoc)
    })
    .catch(next)
})

//

// this would just get picture data
// INDEX aka GET all
router.get('/pictures', (req, res, next) => {
  Picture.find()
  .then(handle404)
  .then(pictures => {
    return pictures.map(picture => picture.toObject())
  })
  .then(pictures => {
    pictures.map(picture => {
      User.findById(picture.owner)
      .then(owner => {
        picture.ownerName = owner.username
        console.log(pictures, "my picture with owner")
        return pictures
      })
      .then(pictures => res.status(200).json({ pictures: pictures }))
    })
  })
  .catch(next)
})

//

// // SHOW aka get by id
router.get('/pictures/:id', (req, res, next) => {
  Picture.findById(req.params.id)
  .then(handle404)
  .then(picture => picture.toObject())
  .then(picture => User.findById(picture.owner)
    .then(owner => {
      picture.ownerName = owner.username
      return picture
    })
    .then(picture => {
      res.status(200).json({ picture: picture })
    })
)
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
// DELETE
router.delete('/pictures/:id', requireToken, (req, res, next) => {
  Picture.findById(req.params.id)
    .then(handle404)
    .then(picture => {
      requireOwnership(req, picture)
      picture.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
