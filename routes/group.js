// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

/* controllers */
const groupController = require('../controllers/groupController')

/*  This is a sample API route. */

router.get("/create",      groupController.createGet    )

router.post("/create",     groupController.createPost   )

router.get("/edit-:slug",  groupController.editGet      )

router.post("/edit-:slug", groupController.editPost     )

router.get("/show-:slug",  groupController.show         )

// general list of groups. Will be react page with map/search etc
router.get("/",           groupController.list          )

// groups the user has joined
router.get("/my-groups",  groupController.myGroups      )

router.get("/joinedGroups", groupController.joinedGroups)

module.exports = router
