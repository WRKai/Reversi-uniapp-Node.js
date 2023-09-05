const express = require('express');
const r = express.Router()
const syncDataHandler = require('../routerHandler/syncData')
const { postSettingsValidator, postGongdeValidator } = require('../validators/syncData')
r.get('/get/gongde', syncDataHandler.getGongde)
r.post('/post/gongde', postGongdeValidator,syncDataHandler.postGongde)
r.get('/get/settings', syncDataHandler.getSettings)
r.post('/post/settings', postSettingsValidator,syncDataHandler.postSettings)
module.exports = r