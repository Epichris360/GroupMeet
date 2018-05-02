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
        res.render('event/create', { vertexSession, gmaps: true, group: data[0],
            bgImg: constants.genericBg[3].imgUrl })
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
    const group_slug = req.params.group_slug
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user          = vertexSession.user
    functions.isAuth(user, res)

    const body       = req.body
    const groupId    = body.groupId
    const event_slug = functions.slugGen(body.name)
    
    const newEvent   = {
        name: body.name, description: body.description, date: body.date, startTime: body.startTime,
        endTime: body.endTime,  mapAddress: JSON.parse( body.mapaddress), group_id: body.groupID, 
        created_at: new Date().toString(), updated_at: new Date().toString(),
        event_slug: event_slug
    } 
    
    turbo.create( collections.events, newEvent )
    .then(event => {
        res.redirect( '/group/show-' + group_slug )
        return
    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
        return
    })
}

const editGet = (req, res) => {
    const event_slug = req.params.event_slug
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user          = vertexSession.user

    functions.isAuth(user, res)
    turbo.fetch( collections.events, { event_slug } )
    .then(data => { 
        res.render('event/edit',{ vertexSession, event: data[0], 
            latLong: JSON.stringify( data[0].mapAddress.latLng ) ,
            bgImg: constants.genericBg[4].imgUrl 
        })
        return
    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
        return
    })

}

const editPost = (req, res) => {
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user          = vertexSession.user 
    functions.isAuth(user, res)

    const body    = req.body
    const eventID = body.eventID

    const updatedEvent = {
        name: body.name, description: body.description, date: body.date, startTime: body.startTime,
        endTime: body.endTime,  mapAddress: JSON.parse( body.mapaddress ),
        updated_at: new Date().toString()
    }
    turbo.updateEntity( collections.events, eventID, updatedEvent )
    .then(result => {
        return result
    })
    .then(event => {
        turbo.fetchOne( collections.groups, event.group_id )
        .then(data => {
            res.redirect( '/group/show-' + data.slug )
            return
        })
    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
        return
    })
}

const show = (req, res) => {
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession  = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const event_slug    = req.params.event_slug

    turbo.fetch( collections.events, { event_slug } )
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
}

const deleted = (req, res) => {
    const eventID = req.body.eventID
    turbo.removeEntity( collections.events, eventID )
    .then(data => {
        res.status(200).json({
            result: data
        })
        return
    })
    .catch(err => {
        res.status(500).json({
            message: err.message
        })
        return
    })
}

const search = (req, res) => {
    res.render('event/search')
    return
}

module.exports = {
    createPost, createGet, editGet, editPost, show, deleted, search
}
