require('dotenv').config()

const express = require('express')
const morgan = require ('morgan')
const cors = require ('cors')
const mongoose = require ('mongoose')
const {engine} = require('express-handlebars');

////////RUTAS////////
const users = require ('./routes/users')
const news = require('./routes/news')
const comments = require ('./routes/comments')
// const albums = require ('./routes/albums')

mongoose.connect('mongodb://127.0.0.1:27017/WikiQueen')

const app = express()
const port = 4000

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/users', users)
app.use('/api/news', news)
app.use('/api/comments', comments)
// app.use('/api/albums', albums)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})