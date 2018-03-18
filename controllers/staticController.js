const turbo       = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants   = require('../constants') 
const functions   = require('../functions')

const index = (req, res) => {
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    res.render('index', { vertexSession })
    return
}

module.exports = {
    index
}