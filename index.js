require('dotenv').config()
const express = require('express')

// my modules
const userRouter = require('./routes/api/user')
const db = require('./models/db-init')

const app = express()

// data initialization need a user screen name
app.use('/user', userRouter)

app.use(function (req, res) {
  res.redirect('/user')
})
app.listen(3000, () => console.log('Listening'))

module.exports = app
