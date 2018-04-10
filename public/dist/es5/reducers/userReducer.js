"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var constants = _interopRequire(require("../constants"));

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/



var initialState = {
	all: null,
	currentUser: null // signed in user
};

module.exports = function (_x, action) {
	var state = arguments[0] === undefined ? initialState : arguments[0];
	var newState = Object.assign({}, state);

	switch (action.type) {

		case constants.CURRENT_USER_RECEIVED:
			newState.currentUser = action.data;
			return newState;

		case constants.USERS_RECEIVED:
			newState.all = action.data;
			return newState;

		case constants.USER_CREATED:
			var array = newState.all ? Object.assign([], newState.all) : [];
			array.unshift(action.data);
			newState.all = array;
			return newState;

		default:
			return state;
	}
};