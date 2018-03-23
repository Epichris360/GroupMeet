// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/* controllers */
const eventController = require('../controllers/eventController')


router.post('/create', eventController.createPost )


module.exports = router
