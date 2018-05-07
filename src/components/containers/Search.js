/*import React, { Component } from 'react'
import { Map }              from '.'
import { connect }          from 'react-redux'

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {}
    }
    render(){
        return(
            <div className="container" style={{paddingTop:'10px'}} >
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
//height:'600px', 
const stateToProps = state => {
    
}
const dispatchToProps = dispatch => {

}

export default connect(stateToProps,dispatchToProps)(Search)
*/
import React, { Component } from 'react'
import { Map }              from '.'
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
    }
    superPrint(){
        console.log('super print')
    }
    render(){
        const markers = [
            { position:{lat:40.7224017, lng:-73.9896719}, label:"label", title:"title"},
            { position:{lat:40.7334017, lng:-73.9776719}, label:"label", title:"title"},
        ] 
        return(
            <div className="sidebar-wrapper" style={{height:'100vh'}} >
                <Map 
                    onMapReady={ map => {
                        if(this.state.map == null)
                            return
                        this.setState({map})
                    }}
                    locationChanged={this.centerChanged.bind(this)}
                    markers={markers}
                    onMarkerClick={this.superPrint.bind(this)}
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
    //const { item } = state
    return{
        
    }
}

export default connect(stateToProps,null)(Search)

//// this.props.item.all ||