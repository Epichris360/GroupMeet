/*import React, { Component } from 'react'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap
            defaultZoom={8}
            defaultCenter={{ lat: -34.397, lng: 150.644 }}
        >
            {   props.markers.map(m => {
                    return(
                        <Marker
                            onClick={props.onClickMarker(m.info)}
                            position={m.cood}
                        />
                    )
                })
            }
        </GoogleMap>
    ))
class Map extends Component{
    constructor(props){
        super(props)
        this.state = {
            markers:[ {cood:{ lat: -34.397, lng: 150.644}, info:"this is info"} ]
        }
    }
    onToggleOpen(info){
        console.log(`info: ${info}`)
    }
    render(){
        return(
            <div style={{height:'550px'}} >
                <MapWithAMarker
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    onClickMarker={this.onToggleOpen.bind(this)}
                    markers={this.state.markers}
                />
            </div>
        )
    }
}

export default Map */

import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

class Map extends Component {

	constructor(props){
		super(props)
		this.state = {
			map: null
		}
	}

	mapMoved(){
		// console.log('mapMoved: '+JSON.stringify(this.state.map.getCenter()))
		if (this.props.locationChanged != null)
			this.props.locationChanged(this.state.map.getCenter())

	}

	zoomChanged(){
		// console.log('zoomChanged: '+this.state.map.getZoom())

	}

	mapLoaded(map){
		if (this.state.map != null)
			return

		this.props.onMapReady(map)
		this.setState({
			map: map
		})
	}

	handleMarkerClick(marker){
		if (this.props.markerClicked != null)
			this.props.markerClicked(marker, this.state.map)
    }
    infoWindowShow(marker){
        console.log('print', marker)
    }
	render(){
        const markers = this.props.markers || []
		return (
			<GoogleMap
				ref={this.mapLoaded.bind(this)}
				onDragEnd={this.mapMoved.bind(this)}
				onZoomChanged={this.zoomChanged.bind(this)}
			    defaultZoom={this.props.zoom}
			    defaultCenter={this.props.center}
            >
                {markers.map((marker, index) => {
                        console.log('marker: ',marker)
                        return(
                            <Marker 
                                key={index} 
                                clickable={true}
                                icon={marker.icon} 
                                title={marker.title} 
                                position={marker.position}
                                onClick={this.infoWindowShow.bind(this,marker)}
                            >
                                {/*
                                    props.isOpen ? <InfoWindow onCloseClick={props.onToggleOpen}>
                                        <FaAnchor />
                                    </InfoWindow> : null*/
                                }
                            </Marker>
                        )
                    }
			    )}
			</GoogleMap>
		)
	}
}

export default withGoogleMap(Map)

//this.handleMarkerClick.bind(this)

/* 

*/