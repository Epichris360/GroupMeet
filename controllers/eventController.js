const turbo       = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants   = require('../constants') 
const functions   = require('../functions')

const createGet = (req, res) => {
    const group_slug = req.params.group_slug
    
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user          = vertexSession.user

    functions.isAuth(user, res)

    turbo.fetch( collections.groups, { slug: group_slug } )
    .then(data => {
        res.render('event/create', { vertexSession, gmaps: true, group: data[0] })
        return
    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
        return
    })
}

const createPost = (req, res) => {
    const body    = req.body
    const groupId = body.groupId
    const newEvent = {
        name: body.name, description: body.description, date: body.date, startTime: body.startTime,
        endTime: body.endTime,  mapAddress: body.mapaddress, group_id: body.groupID
    }
    res.status(200).json({
        newEvent,
        body
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
    createPost, createGet
}