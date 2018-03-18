// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/* controllers */
const userController = require('../controllers/userController')

/*  This is a sample API route. */

router.get('/signup',  userController.signUpGet )

router.post('/signup', userController.signUpPost)

router.get('/signin',  userController.signInGet )

router.post('/signin', userController.signInPost)

router.get("/signout", userController.signOut   )

module.exports = router
