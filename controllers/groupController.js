const turbo       = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants   = require('../constants') 
const functions   = require('../functions')

const createGet = (req, res) => {
    const vertexSession = req.vertexSession
    res.render("group/create", { vertexSession })
    return
}

const createPost = (req, res) => {
    //create slug
    const body         = req.body
    const imgUrl       = body.image // have default img in case of no img uploaded
    const name         = body.name
    const description  = body.description
    const shortDescrip = description.substring(0,120) + '...'
    const slug         = functions.slugGen(name)

    const newGroup = {
        imgUrl, name, description, shortDescrip, slug
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
    const vertexSession = req.vertexSession
    res.render("group/edit", { vertexSession })
    return
}

const editPost = (req, res) => {

}

const show = (req, res) => {
    const slug          = req.params.slug
    const vertexSession = req.vertexSession
    turbo.fetch( collections.groups, { slug })
    .then(groups => {
        description = groups[0].description.split("\n")
        res.render("group/show", { vertexSession, group: groups[0], description })
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

const list = (req, res) => {
    // discovery of groups. this part will include react for maps, search etc
    const vertexSession = req.vertexSession
    res.render("group/list", { vertexSession })
    return
}

const myGroups = (req, res) => {
    // groups person has created and manages
    const vertexSession = req.vertexSession
    res.render("group/myGroups", { vertexSession })
    return
}

const joinedGroups = (req, res) => {
    // groups that the person has joined list
    const vertexSession = req.vertexSession
    res.render("group/joinedGroups", {vertexSession})
    return
}

module.exports = {
    createGet, createPost, editGet, editPost, show, list, myGroups, joinedGroups
}