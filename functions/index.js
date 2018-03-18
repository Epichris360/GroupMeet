const moment = require('moment')
const constants = require('../constants')

//ill only use this for the front page. this would make pagination hell
const shuffleArray = ( arr ) => {
    const newArr = arr
                    .map((a) => ({sort: Math.random(), value: a}))
                    .sort((a, b) => a.sort - b.sort)
                    .map((a) => a.value)
    return shuffle
}

const randomString = (length) => {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

const randTicket = () => {
    const length = 5
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789"
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

//split array into page chunks
const paginationArrays = (arr, chunkSize) => {
    let groups = [], i;
    for (i = 0; i < arr.length; i += chunkSize) {
        groups.push(arr.slice(i, i + chunkSize));
    }
    return groups;
}

const pgLinks = (num, activePg) => {
    activePg++
    
    let paginationLinks = {}
    if( num > activePg && (activePg - 1) > 0 ){
        paginationLinks.forward  = { class: '', num: activePg + 1 }
        paginationLinks.backward = { class: '', num: activePg -1 } 
    }else if( num > activePg && (activePg - 1) == 0 ){
        paginationLinks.forward  = { class: '', num: activePg + 1 }
        paginationLinks.backward = { class: 'disabled', num: '' } 
    }else if( num < activePg  ){
        paginationLinks.forward  = { class: 'disabled', num: '' }
        paginationLinks.backward = { class: '', num: activePg -1 } 
    }else if( num == activePg && num > 1 ){
        paginationLinks.forward  = { class: 'disabled', num: '' }
        paginationLinks.backward = { class: '', num: activePg -1 } 
    }else{
        paginationLinks.forward  = { class: 'disabled', num: '' }
        paginationLinks.backward = { class: 'disabled', num: '' } 
    }
    return paginationLinks
}

const findTotalAndShipping = (cart) => {
    const qtys = cart.items.map( i => parseInt(i.qty) )
    // this sums up the the array of qtys which are numbers using a reduce function 
    const sum  = qtys.reduce((a, b) => a + b, 0)

    //gets total amount of shipping cost. for concepts sake, shipping is a flat $5 per item
    const shipping = sum * 2
    // over all cost is cart.total + shipping
    const totalCost = parseFloat(cart.total) + shipping

    return {
        shipping: shipping, totalCost: totalCost
    }
}

 //to protect routes where the user must be authorized to enter
const isAuth = (user, res) => {
    if( user.id == '' ){
        res.redirect("/")
    }
    return
}

// if user is logged in it will redirect to root
// this is in case someone goes to /signin after having signed in
const isSignedIn = (user, res) => {
    if( user.id.length > 0 ){
        res.redirect("/")
    }
    return
}

//to protect routes where the user must be an admin to modify something
const isAdmin = (user, res) => {
    if(user.role == constants.customer ){
        res.redirect("/")
    }
    return
}

const isStasher = (user, res) => {
    if( user.role != constants.stasher ){
        res.redirect("/")
    }
    return
}

const calcPrice   = (qtyBags, startDay, endDay) => {
    const bagsNum = parseInt( qtyBags )
    const start   = new Date(startDay )
    const end     = new Date(endDay   )
    let days      = parseInt( (end - start)/(1000*60*60*24) )

    days += 1
    let sumTotal  = 0
    if(days > 1){
        sumTotal  = (days - 1) * constants.costSecondDay * bagsNum
    }
    sumTotal+= constants.costFirstDay * bagsNum
    return sumTotal   
}

const scheduleSelected = ( day ) => {
    // this is used to mark as selected the specific time set as the open or close time for a 
    // location. so that it can be shown in the dropdown
    let result   = {}
    result.start = JSON.parse(JSON.stringify( constants.times ))
    result.end   = JSON.parse(JSON.stringify( constants.times ))
    const times  = JSON.parse(JSON.stringify( constants.times ))
    
    const indexStart = times.map(t => t.name).indexOf( day.openTime )
    result.start[indexStart].selected = "selected"
    
    const indexEnd   = times.map(t => t.name).indexOf( day.closeTime )
    result.end[indexEnd].selected = "selected"
    result.day =  capitalizeFirstLetter( day.name )
    return result
}

const selected = (location, list, prop ) => {
    // abstracted function that marks as selected an item that will go in a drop down
    // for example if a location is in NYC, then when the list hits nyc denoted by list[x].name
    // == location[prop] *prop* then the list[x] has a selected == "selected assigned ti ut"
    for( let x = 0; x < list.length; x++ ){
        if( list[x].name == location[prop] ){
            list[x].selected = "selected"
        }else{
            list[x].selected = ""
        }
    }

    return list
}

const capitalizeFirstLetter = (string) => {
    return string[0].toUpperCase() + string.slice(1);
}

const blankVertexSession = () => {
    let vertexSession = {}
    vertexSession.user = { id: '', username: '', email:'', loggedIn: false, notloggedIn: true, role:'' }
    // canEdit:false,
    vertexSession.cart = { user_id:'', items:[], total:0, numItems: 0 }
    
    return vertexSession
}

const starVal = (star) => {
    /*1 star == 5, 2 star == 4, 3 star == 3, 4 star == 2, 5 star == 1*/
    let result
    if( star == 5 ){
        result = 1
    }else if( star == 4 ){
        result = 2
    }else if( star == 3 ){
        result = 3
    }else if( star == 2 ){
        result = 4
    }else if( star == 1 ){
        result = 5
    }
    return result
}

const reviewEditPerUser = (reviews, user) => {
    // figures out which comments can be edited by the current user
    for(let x = 0; x < reviews.length; x++){
        reviews[x].canEdit = reviews[x].user_id == user.id
    }
    return reviews
}

module.exports = {

    shuffleArray:         shuffleArray,
    randomString:         randomString,
    paginationArrays:     paginationArrays,
    pgLinks:              pgLinks,
    findTotalAndShipping: findTotalAndShipping,
    isAuth:               isAuth,
    isSignedIn:           isSignedIn,
    isAdmin:              isAdmin,
    calcPrice:            calcPrice,
    isStasher:            isStasher,
    scheduleSelected:     scheduleSelected,
    selected:             selected,
    randTicket:           randTicket,
    blankVertexSession:   blankVertexSession,
    starVal:              starVal,
    reviewEditPerUser:    reviewEditPerUser
}

  