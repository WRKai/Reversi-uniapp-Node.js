const express = require('express');
const r = express.Router()
const userHandler = require('../routerHandler/user')
const { registerAndLoginValidator } = require('../validators/user')
r.post('/register', registerAndLoginValidator, userHandler.register)
r.post('/login', registerAndLoginValidator, userHandler.login)
module.exports = r