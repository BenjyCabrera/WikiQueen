const mongoose = require ('mongoose')

const newSchema = new mongoose.Schema({
  titular: {type: String, required: true},
  texto: {type: String, required: true},
  fecha: String,
  comentario: {type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}
})

const News = mongoose.model('News', newSchema)

module.exports = News