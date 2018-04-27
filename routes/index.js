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

router.get("/testing", (req, res) => {
	const users = ["5ae255aba64c8700144953fc","5aaede524621730014152771"]
	//["superuser@startup.com","cristian@startup.com"]
	turbo.fetch("user", { email: ["superuser@startup.com","cristian@startup.com"] } )
	.then(data => {
		res.status(200).json({
			users: data
		})
		return
	})
	.catch(err => {
		res.status(500).json({

		})
		return
	})
})

router.get('/userUpdate', (req, res) => {
	turbo.fetch( collections.groups ,null)
	.then(data => {
		res.status(200).json({
			groups: data
		})
		return 
	})
	/*.then(groups => {
		groups[0].members  = []
		groups[0].userInfo = []
		turbo.updateEntity( collections.groups, groups[0].id, groups[0] )
		.then(data => {
			res.status(200).json({
				data
			})
			return
		})
	})*/
	.catch(err => {
		res.status(200).json({
			err: err.message
		})
		return
	})
})


module.exports = router
