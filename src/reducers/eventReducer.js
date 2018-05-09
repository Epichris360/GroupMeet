import constants from '../constants'

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
	This is a sample reducer or user management. If you remove 
	and use your own reducers, remember to update the store 
	file (../stores/index.js) with your reducers.
* * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/
 


var initialState = []

export default (state = initialState, action) => {
	let newState = Object.assign([], state)

	switch (action.type) {

		case constants.EVENTS_RECEIVED:
            newState = action.data
            return newState
        
		default:
			return state
	}
}