const turbo       = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const collections = require('../collections')
const constants   = require('../constants') 
const functions   = require('../functions')

const signInGet = (req, res) => {
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    res.render('user/SignIn',{ vertexSession })
    return
}

const signInPost = (req, res) => {
    const credentials = { username: req.body.username, password: req.body.password }
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    turbo.login(credentials)
    .then(data => {
        //const canEdit = (data.role != constants.customer.seller || data.role != constants.customer.buyer)
        //canEdit: canEdit
        req.vertexSession.user = { id: data.id, username: data.username, 
            firstName: data.firstName, lastName: data.lastName, role: data.role,
            email: data.email, loggedIn: true,
            notloggedIn:false, 
        }
        res.redirect("/",{ vertexSession })
        return
    })
    .catch(err => {
        req.vertexSession.msg = { 
            show: true, text: err.message , type:'danger' 
        }
        res.redirect('back')
        return
    })
}

const signUpGet = (req, res) => {
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    res.render('user/SignUp', { vertexSession })
    return
}

const signUpPost = (req, res) => {
    // post request that creates a new user
    const body    = req.body
    const newUser = { username: body.username, email: body.email, password: body.password, role: 'regular' }
    if(  req.vertexSession == null || req.vertexSession.user == null ){ 
        req.vertexSession = functions.blankVertexSession() 
    }
    const vertexSession = req.vertexSession
    turbo.createUser(newUser)
    .then(data => {
        req.vertexSession.user = { id: data.id, username: data.username, 
            firstName: data.firstName, lastName: data.lastName, role: data.role,
            email: data.email, loggedIn: true,
            notloggedIn:false, 
        }
        res.redirect("/", { vertexSession })
        return        
    })
    .catch(err => {
        req.vertexSession.msg = { show: true, text: err.message , type:'danger' }
        res.redirect('back')
        return
    })
}

const signOut = (req, res) => {
    //resets all session data
    req.vertexSession.user = { id: '', username: '', email:'', loggedIn: false, notloggedIn: true, role:'' } // canEdit:false,
    req.vertexSession.msg  = { show: false, text:'', type:'' }
    
    const vertexSession = req.vertexSession
    res.redirect("/", { vertexSession })
    return
}

module.exports = {
    signInGet, signInPost, signUpGet, signUpPost, signOut
}