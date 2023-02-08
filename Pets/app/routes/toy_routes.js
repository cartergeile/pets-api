const express = require('express')
const passport = require('passport')
const Pet = require('../models/pet')
// custom middleware
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
// initiate a router (mini app that only handles routes)
const router = express.Router()

// ROUTES

// POST -> create a toy
// POST /toys/:petId
// anybody can give a pet a toy
// so we wont requireToken
// but our toySchema has some non-required fields, so lets use removeBlanks
router.post('/toys/:petId', removeBlanks, (req, res, next) => {
  // isolate our toy from the request, and save to variable
  const toy = req.body.toy
  // isolate and save our pets id for easy reference
  const petId = req.params.petId
  // find the pet and push the new toy into the pets array
  Pet.findById(petId)
    // first step is to use our custom 404 middleware
    .then(handle404)
    // handle adding toy to pet
    .then(pet => {
      // add toys to toy array
      pet.toys.push(toy)
      // save the pet
      return pet.save()
    })
    // send info after updating the pet
    .then(pet => res.status(201).json({ pet: pet }))
    // pass errors along to error handler
    .catch(next)
})

// PATCH -> update a toy
// PATCH /toys/:petId/:toyId
router.patch('/toys/:petId/:toyId', requireToken, removeBlanks, (req, res) => {
  // get and save the IDs to variables
  const petId = req.params.petId
  const toyId = req.params.toyId
  // find our pet
  // single out the toy
  // make sure the user is the pets owner
  // update accordingly
  // send a status
  Pet.findById(petId)
    .then(handle404)
    .then(pet => {
      const theToy = pet.toys.id(toyId)
      requireOwnership(req, pet)
      theToy.set(req.body.toy)

      return pet.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})
// DELETE -> destroy a toy
// /toys/:petId/:toyId

// export our router
module.exports = router