const User = require('../models/user');
const generatetoken = require('../helpers/generateToken');
const { hash, compare } = require('../helpers/bcrypt');

class UserController {

  static signin(req, res, next) {
    const { email, password } = req.body
    User.findOne({
        email
      })
      .then(found => {
        if (found) {
          if (compare(password, found.password) == false) throw new Error('wrong password')
          else {
            const isuser = {
              id: found._id,
              name: found.username,
              email: found.email
            }
            const token = generatetoken(isuser)
            res.status(200).json({
              token,
              username: isuser.name,
              id: isuser.id,
              email: isuser.email
            })
          }
        } else res.status(404).json({ meesage: 'not found' })
      })
      .catch(next)
  }

  static signinGoogle(req, res, next) {
    let newUser = null
    console.log('masuk');
    client.verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.GOOGLE_ACCESS_TOKEN
      })
      .then(user => {
        newUser = user.payload
        return User.findOne({
          email: user.payload.email
        })
      })
      .then(found => {
        if (!found) {
          return User.create({
            username: newUser.name,
            email: newUser.email,
            password: hash(process.env.GENERATE_PASSWORD)
          })
        } else {
          const isuser = {
            _id: found._id,
            username: found.username,
            email: found.email
          }
          return isuser
        }
      })
      .then(client => {
        const payload = {
          id: client._id,
          username: client.username,
          email: client.email
        }
        const token = generatetoken(payload)
        res.json({
          token,
          username: client.username,
          id: client._id
        })
      })
      .catch(next)
  }

  static signup(req, res, next) {

    User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash(req.body.password),
        phone: req.body.phone,
        address: req.body.address
      })
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(err => {
        next(err)
      })
  }

  static findOne(req, res, next) {
    if(req.params.id == req.decoded.id) {
      User.findOne({
        _id: req.decoded.id
      })
        .then(found => {
          res.status(200).json(found)
        })
        .catch(next)
    }
  }

}

module.exports = UserController