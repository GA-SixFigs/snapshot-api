const express = require('express')

const passport = require('passport')

const picture = require('../models/picture')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// this would just get picture data
// INDEX aka GET all
router.get('/pictures', requireToken, (req, res, next) => {
  picture.find()
    .then(pictures => {
      return pictures.map(picture => picture.toObject())
    })
    .then(pictures => res.status(200).json({ pictures: pictures }))
    .catch(next)
})

// SHOW aka get by id
router.get('/pictures/:id', requireToken, (req, res, next) => {
  picture.findById(req.params.id)
    .then(handle404)
    .then(picture => res.status(200).json({ picture: picture.toObject() }))
    .catch(next)
})

// CREATE aka post
router.post('/pictures', requireToken, (req, res, next) => {
  req.body.picture.owner = req.user.id

  picture.create(req.body.picture)

    .then(picture => {
      res.status(201).json({ picture: picture.toObject() })
    })
    .catch(next)
})

// UPDATE aka find by id and UPDATE a single post
router.patch('/pictures/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.picture.owner

  picture.findById(req.params.id)
    .then(handle404)
    .then(picture => {
      requireOwnership(req, picture)

      return picture.updateOne(req.body.picture)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DELETE
router.delete('/pictures/:id', requireToken, (req, res, next) => {
  picture.findById(req.params.id)
    .then(handle404)
    .then(picture => {
      requireOwnership(req, picture)
      picture.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
