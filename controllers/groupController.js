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
}

const editGet = (req, res) => {
    const vertexSession = req.vertexSession
    res.render("group/edit", { vertexSession })
    return
}

const editPost = (req, res) => {

}

const show = (req, res) => {
    const vertexSession = req.vertexSession
    res.render("group/show", { vertexSession })
    return
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