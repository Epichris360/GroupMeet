const turbo       = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants   = require('../constants') 
const functions   = require('../functions')

const createPost = (req, res) => {
    res.status(200).json({
        hi:"hi"
    })
    return
}

module.exports = {
    createPost
}