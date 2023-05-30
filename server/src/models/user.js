const mongoose = require ('mongoose')

const { pick } = require('lodash')

const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: Boolean,
})

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    pick(this, ['name','isAdmin']),
    process.env.jwt_privateKey
  )
}

const User = mongoose.model('User', userSchema)

module.exports = User