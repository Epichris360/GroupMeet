import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	This container serves primarily as an example of how to execute basic
	user tasks like login, logout, etc. Feel free to re-purpose this componenet 
	for your own project or create your own components using the functions 
	from here as a guide.
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
*/

class Search extends Component { 
	constructor(){
		super()
		this.state = {

		}
	}

	render(){
		return (
			<div>
				<h1>Hi</h1>
			</div>
		)
	}
}

const stateToProps = (state) => {
	return {
	}
}

const dispatchToProps = (dispatch) => {
	return {
	}
}

export default connect(stateToProps, dispatchToProps)(Search) 