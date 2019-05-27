import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Restaurants } from '../util/restaurants';


export class RestaurantsMap extends Component {

    constructor(props) {
        super(props);

        this.state = {
            restaurants: Restaurants
        }
    }

    displayMarkers = () => {
        return this.state.restaurants.map((r, index) => {
            return <Marker
                key={index} id={index}
                position={{
                    lat: restaurants.lat,
                    lng: restaurants.long
                }}
                onClick={() => console.log("You clicked me!")}
            ></Marker>
        })
    }
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={10}
                style={MapStyles}
                defaultCenter={{ lat: 48.856613, lng: 2.352222 }}>
                >
            <Marker position={{ lat: 49.00, lng: 2.352222 }}></Marker>
            </Map>
        );
    }
}

const MapStyles = {
    width: '100%',
    height: '100%',
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBgSU_6QpVV5xoPCfmG6kzM5Oy12GZWQFk'
})(RestaurantsMap);







