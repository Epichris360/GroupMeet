import React, { Component }         from 'react'
import { withGoogleMap, 
    GoogleMap, Marker, InfoWindow } from 'react-google-maps'
import { connect }                  from 'react-redux'
import actions                      from '../../actions'

class Map extends Component {

	constructor(props){
		super(props)
		this.state = {
			map: null
		}
	}
	mapLoaded(map){
		if (this.state.map != null)
			return

		this.props.onMapReady(map)
		this.setState({
			map: map
        })
        return
	}
    infoWindowShow(ev){
        // 
        let events   = this.props.event
        for( let x = 0; x < events.length; x++ ){
            if( ev.id == events[x].id ){
                events[x].eventSelected = true
            }else{
                events[x].eventSelected = false
            }
        }
        this.props.fetchEvents(events)
        return
    }
    closeInfoWindowAndUnSelect(ev){
        // 
        let events   = this.props.event
        for( let x = 0; x < events.length; x++ ){
            events[x].eventSelected = false
        }
        this.props.fetchEvents(events)
        return
    }
	render(){
		return (
			<GoogleMap
                ref={this.mapLoaded.bind(this)}
			    defaultZoom={this.props.zoom}
			    defaultCenter={this.props.center}
            >
                {this.props.event.map((ev, index) => {
                        return(
                            <Marker 
                                key={index} 
                                clickable={true}
                                icon={ev.icon} 
                                title={ev.name} 
                                position={ev.mapAddress.latLng}
                                onClick={this.infoWindowShow.bind(this,ev)}
                            >   
                            {   
                                ev.eventSelected ? 
                                <InfoWindow 
                                    onCloseClick={ this.closeInfoWindowAndUnSelect.bind(this,ev) }
                                >
                                    <div>
                                        <h6>{ev.name}</h6>
                                        <p style={{width:"300px", height:"100%"}} >
                                            {ev.description.substr(0,300)}...
                                        </p>
                                        <br />
                                        <a className="btn btn-success" href={`/group/show-${ev.group_slug}`}>Go To Group</a>
                                    </div>
                                </InfoWindow>  : null
                            }
                                
                            </Marker>
                        )
                    }
			    )}
			</GoogleMap>
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

export default withGoogleMap(connect(stateToProps, dispatchToProps)(Map))

/* ref={this.mapLoaded.bind(this)}
{/*
                                    props.isOpen ? <InfoWindow onCloseClick={props.onToggleOpen}>
                                        <FaAnchor />
                                    </InfoWindow> : null
                                }
*/
