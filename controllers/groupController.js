const turbo       = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants   = require('../constants') 
const functions   = require('../functions')

const createGet = (req, res) => {

    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user          = vertexSession.user
    functions.isAuth(user, res)

    res.render("group/create", { vertexSession })
    return
}

const createPost = (req, res) => {
    const body         = req.body
    const imgUrl       = body.image.length > 0 ? body.image : constants.defaultImgGroup 
    const name         = body.name
    const description  = body.description
    const shortDescrip = description.substring(0,120) + '...'
    const slug         = functions.slugGen(name)
    const user         = req.vertexSession.user

    const newGroup = {
        imgUrl, name, description, shortDescrip, slug, owner_id: user.id, members:[], userInfo:[]
    }

    turbo.create( collections.groups, newGroup )
    .then(group => {
        res.status(200).json({
            group
        })
        return
    })
    .catch(err => {
        //create universal partial for errors
        res.status(500).json({
            err: err.message
        })
        return
    })
}

const editGet = (req, res) => {
    const slug          = req.params.slug
    
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user          = vertexSession.user
    functions.isAuth(user, res)

    turbo.fetch( collections.groups, { slug })
    .then(groups => {
        res.render("group/edit", { vertexSession, group: groups[0] })
        return
    })
    .catch(err => {
        res.status(200).json({
            // create 404 page
            err: err.message
        })
        return
    })
}

const editPost = (req, res) => { 
    const body = req.body
    const updatedGroup = {
        name: body.name, description: body.description, imgUrl: body.image,
    }
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    functions.isAuth(user, res)
    turbo.updateEntity( collections.groups, body.groupId, updatedGroup )
    .then(update => {
       res.redirect("/group/show-" + update.slug)
       return
    })
    .catch(err => {
        res.status(200).json({
            err: err.status
        })
        return
    })
}

const show = (req, res) => {
    const slug          = req.params.slug
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    turbo.fetch( collections.groups, { slug })
    .then(groups => {
        return groups[0]
    })
    .then(group => {
        turbo.fetch( collections.events, { group_id: group.id } )
        .then(events => {
            
            // splits the description into an array of paragraphs
            const description = group.description.split("\n")
            // is use to tell if the current user is the owner of the group
            // therefore given update, and delete capabilities
            const canEdit     = ( group.owner_id == vertexSession.user.id ) 

            const joinedGroup = group.members.indexOf(vertexSession.user.id)
            const canJoin    = ( group.owner_id != vertexSession.user.id ) && joinedGroup
            // events that will happen in the future
            let eventsFuture = []
            for( let x = 0; x < events.length; x++ ){

                const yesterdaysDate = ( d => new Date(d.setDate(d.getDate()-1)) )(new Date);
                if( new Date( events[x].date ) >= yesterdaysDate ){

                    events[x].JSONstr = JSON.stringify({
                        name: events[x].name, description: events[x].description,
                        address: events[x].mapAddress.formattedAddress, 
                        date: events[x].date, startTime: events[x].startTime,
                        endTime: events[x].endTime
                    })
                    eventsFuture.push( events[x] )
                }

            }
            res.render("group/show", { vertexSession, group: group, description, 
                canEdit, canJoin, imgBg: constants.genericBg[1].imgUrl, events: eventsFuture
            })
            return
        })

    })
    .catch(err => {
        res.status(200).json({
            // create 404 page
            err: err.message
        })
        return
    })
}

const list = (req, res) => {
    let page
    if( typeof req.query.page == "undefined" || parseInt( req.query.page ) == 1 ){
        page = 0
    }else{
        page = parseInt( req.query.page ) 
    }
    // discovery of groups. this part will include react for maps, search etc
    const vertexSession = req.vertexSession
    turbo.fetch(collections.groups, null)
    .then(data => {
        const pageData  = functions.paginationArrays(data, 12)
        const pgLinks   = functions.pgLinks(pageData.length, page)

        res.render("group/list", { vertexSession, groups: pageData[page], pgLinks,
            imgBg: constants.genericBg[1].imgUrl })
        return

    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
        return
    })
}

const myGroups = (req, res) => {
    // groups person has created and manages
    // for pagination
    let page
    if( typeof req.query.page == "undefined" || parseInt( req.query.page ) == 1 ){
        page = 0
    }else{
        page = parseInt( req.query.page ) 
    }
    // if user obj doesnt exist in sesssions, then a blank one will be added to it
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user = vertexSession.user
    functions.isAuth(user, res)
    const imgBg = constants.genericBg[2].imgUrl

    turbo.fetch( collections.groups, null )
    .then(data => {
        const pageData  = functions.paginationArrays(data, 12)
        const pgLinks   = functions.pgLinks(pageData.length, page)

        res.render("group/myGroups", { vertexSession, imgBg, groups: pageData[page], pgLinks, })
        return
    })
    .catch(err => {
        res.status(500).json({
            err: err.message
        })
        return
    })
}

const joinGroup = (req, res) => {
    const slug = req.params.slug

    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user = vertexSession.user
    
    if( user.id == '' ){
        res.redirect("/user/signup")
        return
    }else{
        turbo.fetch( collections.groups, { slug: slug } )
        .then(data => {
            return data[0]
        })
        .then(group => {
            group.members  = [ ...group.members, user.id ]
            group.userInfo = [ ...group.userInfo, { id: user.id, email: user.email } ]
            turbo.updateEntity( collections.groups, group.id, group )
            .then(updated => {
                res.redirect("/group/show-" + slug)
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

}

const joinedGroups = (req, res) => {
    // groups that the person has joined list
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    const user = vertexSession.user
    functions.isAuth(user, res)

    res.render("group/joinedGroups", {vertexSession})
    return
}


module.exports = {
    createGet, createPost, editGet, editPost, show, list, myGroups, joinedGroups, 
    joinGroup
}