'use strict'

const session = require('express-session')
const Keycloak = require('keycloak-connect')
const env = require('env-var')

const KEYCLOAK_CONFIG = env.get('KEYCLOAK_CONFIG').asJsonObject()

module.exports = (app) => {
  if (KEYCLOAK_CONFIG) {
    console.log(new Date().toJSON(), 'application is protected with keycloak')
    const store = new session.MemoryStore()

    const sessionMw = session({
      secret: require('crypto').randomBytes(8).toString(),
      resave: false,
      saveUninitialized: true,
      store
    })

    const keycloak = new Keycloak({
      store
    }, KEYCLOAK_CONFIG)

    app.use(sessionMw)
    app.use(keycloak.middleware({
      logout: '/logout'
    }));

    return {
      protect: keycloak.protect.bind(keycloak)
    }
  } else {
    return {
      protect: () => {
        console.warn(new Date().toJSON(), 'keycloak.protect was called, but KEYCLOAK_CONFIG is not set. App is not protected')
        return (req, res, next) => next()
      }
    }
  }
}
