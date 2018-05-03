import React, { Component } from 'react'
import { Map }              from '../presentation'
import { connect }          from 'react-redux'

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            map:null
        }
    }
    centerChanged(center){
        console.log('Map Moved', JSON.stringify(center) )
        console.log('lat '+center.lat()+' '+'lng'+center.lng() )
        //this.centerChanged.bind(this)
    }
    render(){
        const markers =  []
        return(
            <div className="sidebar-wrapper" style={{height:'600px'}} >
                <Map 
                    onMapReady={ map => {
                        if(this.state.map == null)
                            return
                        this.setState({map})
                    }}
                    locationChanged={console.log('hi')}
                    markers={markers}
                    zoom={14}
                    center={{lat:40.7224017, lng:-73.9896719}}
                    containerElement={ <div style={{height:100+'%'}} /> }
                    mapElement={ <div style={{height:100+'%'}} /> }
                />
            </div>
        )
    }
}

const stateToProps = state => {
    
}
const dispatchToProps = dispatch => {

}

export default connect(stateToProps,dispatchToProps)(Search)