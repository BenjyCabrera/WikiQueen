const mongoose = require ('mongoose')

const commentSchema = new mongoose.Schema({
  texto: {type: String, required: true},
  autor: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment