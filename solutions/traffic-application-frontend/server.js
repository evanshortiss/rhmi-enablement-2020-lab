'use strict'

const express = require('express')
const app = express()
const env = require('env-var')
const session = require('express-session')

const { resolve } = require('path')

const PORT = env.get('PORT').default(8080).asPortNumber()
const HOST = env.get('HOST').default('0.0.0.0').asString()

app.set('trust proxy', true)
app.use(require('morgan')('combined'))

// Enable keycloak on the application (if configured)
const keycloak = require('./keycloak')(app)

app.use(keycloak.protect(), express.static(resolve(__dirname, 'dist/')))
app.listen(PORT, HOST, (err) => {
  if (err) {
    throw err
  }
  console.log(new Date().toJSON(),`server started listening on ${PORT}\n`)
})
