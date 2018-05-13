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
			return [...action.data]
			
		case constants.EVENT_UPDATE:
			return state.map(
                e => event(e,action)
            )
        
		default:
			return state
	}
}

