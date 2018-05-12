import React, { Component } from 'react'
import { Map, Panel }       from '.'
import { connect }          from 'react-redux'
import axios                from 'axios'
import actions              from '../../actions'

class Search extends Component{
    constructor(props){
        super(props)
        this.state = {
            map:null
        }
    }
    componentDidMount(){
        axios.get('/api/get-events')
        .then( response => {
            let events = response.data.events
            for(let x = 0; x < events.length; x++){
                events[x].eventSelected = false
            }
            console.log('events: ',events)
            this.props.fetchEvents(events)
            return
        })
        .catch( err => {
            console.log('err: ',err)
            return
        }) 
    }
    centerChanged(center){
        console.log('Map Moved', JSON.stringify(center) )
        console.log('lat '+center.lat()+' '+'lng'+center.lng() )
    }
    superPrint(){
        console.log('super print')
    }
    render(){
        return(
            <div className="container" >
                <div className="row" style={{ paddingTop:'8px'}} >
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{height:'100vh'}} >
                        <Map 
                            onMapReady={ map => {
                                if(this.state.map == null)
                                    return
                                this.setState({map})
                            }}
                            onMarkerClick={this.superPrint.bind(this)}
                            zoom={14}
                            center={{lat:40.7224017, lng:-73.9896719}}
                            containerElement={ <div style={{height:100+'%'}} /> }
                            mapElement={ <div style={{height:100+'%'}} /> }
                        />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" >
                       <Panel />
                    </div>
                </div>
            </div>
        )
    }
}

const stateToProps = state => {
    const { event } = state
    return{
        event
    }
}

const dispatchToProps = dispatch => {
    return{
        fetchEvents: events => dispatch( actions.fetchEvents(events) )
    }
}
 
export default connect(stateToProps,dispatchToProps)(Search)
