import React, { Component } from 'react'
import { Map }              from '.'
import { connect }          from 'react-redux'

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className="container" style={{height:'600px'}} >
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                        <Map /> 
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" ></div>
                </div>
            </div>
        )
    }
}

const stateToProps = state => {
    
}
const dispatchToProps = dispatch => {

}

export default connect(stateToProps,dispatchToProps)(Search)