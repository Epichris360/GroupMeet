import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { connect }          from 'react-redux'


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
	}
    infoWindowShow(marker){
        console.log('print', marker)
    }
	render(){
		return (
			<GoogleMap
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

}

export default withGoogleMap(connect(stateToProps, dispatchToProps)(Map))

/* ref={this.mapLoaded.bind(this)}
{/*
                                    props.isOpen ? <InfoWindow onCloseClick={props.onToggleOpen}>
                                        <FaAnchor />
                                    </InfoWindow> : null
                                }
*/
