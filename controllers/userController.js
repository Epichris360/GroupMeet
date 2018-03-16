const turbo     = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants = require('../constants') 

const signInGet = (req, res) => {
    res.render('user/SignIn')
}

const signInPost = (req, res) => {

}

const signUpGet = (req, res) => {
    res.render('user/SignUp')
}

const signUpPost = (req, res) => {

}

module.exports = {
    signInGet, signInPost, signUpGet, signUpPost
}