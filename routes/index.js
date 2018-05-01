// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()
const collections = require('../collections')

const staticController = require('../controllers/staticController')
const prototype = "prototype"
/*  This is the home route. It renders the index.mustache page from the views directory.
	Data is rendered using the Mustache templating engine. For more
	information, view here: https://mustache.github.io/#demo */
router.get('/', staticController.index )

router.get('/testing', (req, res) => {
	turbo.fetch(collections.groups, null)
	.then(data => {
		res.status(200).json({
			group: data[0]
		})
		return
	})
	.catch(err => {
		res.status(500).json({
			err: err.message
		})
		return
	})
})

router.get('/testing2', (req, res) => {
	const obj = { name:"hi there hi there" }
	turbo.create( prototype, obj )
	.then(data => {
		res.status(200).json({
			result: data
		})
		return
	})
	.catch(err => {
		res.status(500).json({
			err: err.message
		})
		return
	})
})


module.exports = router

