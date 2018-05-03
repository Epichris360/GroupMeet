import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
import { Search } from './'

class Main extends Component { 
	constructor(){
		super()
		this.state = {

		}
	}

	render(){
		return (
			<div className="container" style={{ paddingTop: '10px' }} >
				<div className="row" >			
					<div className="col-md-6 col-sm-12 col-xs-12" >
						<Search />
					</div>
					<div className="col-md-6 col-sm-12 col-xs-12" >
						Right Hand Side
						<br/>
						sdjfnsldjfiwemciweomc wmeoi mwioem coimoi moiewmcmewoc wiem
					</div>
				</div>
			</div>
		)
	}
}

const stateToProps = (state) => {

}

const dispatchToProps = (dispatch) => {

}

export default connect(stateToProps, dispatchToProps)(Main) 