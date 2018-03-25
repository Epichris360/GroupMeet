const turbo       = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants   = require('../constants') 
const functions   = require('../functions')

const createPost = (req, res) => {
    const body    = req.body
    const groupId = body.groupId
    const newEvent = {
        name: body.name, description: body.description, date: body.date, startTime: body.startTime,
        endTime: body.endTime, imgUrl: body.imgUrl, 
    }
    res.status(200).json({
        newEvent
    })
    /*
    turbo.create( collections.events, newEvent )
    .then(event => {
        res.status(200).json({
            event
        })
        return
    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
        return
    })
     */
    return
}

module.exports = {
    createPost
}