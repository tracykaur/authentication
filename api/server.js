// Bring in our environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Plugins
app.use(bodyParser.json()) // Allows me to have JSON uploads (POST/PUT)

// Routes
app.listen(7000, (error) => {
  if (error) {
    console.log('There was a problem starting the server', error)
  } else {
    console.log('Server is listening on http://localhost:7000/')
  }
})
