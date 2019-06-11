import React, { Component } from 'react';
import RestaurantsDatas from '../util/restaurants.json';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from "react-google-maps";
import StarRatingComponent from 'react-star-rating-component';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                lat: 48.856613,
                lng: 2.352222
            },
            selectedRestaurant: {
                "restaurantName": "Angel",
                "address": "30 rue Nazareth, 75003 Paris",
                "lat": 48.863700,
                "long": 2.361090,
                "ratings": [
                    {
                        "stars": 5,
                        "comment": "Belle cuisine gastronomique"
                    },
                    {
                        "stars": 3,
                        "comment": "Gastronomique et beaucoup trop cher"
                    }
                ]
            }
        }
    }

    setSelectedRestaurant = (r) => {
        this.setState({
            selectedRestaurant: r,
        })
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(location => {
            this.setState({
                position: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude
                }
            })
        });
    }

    promptRatings = () => {
        return (
            this.state.selectedRestaurant.ratings.map((rating, index) => (
                <ul key={rating + index}>
                    <li >{rating.stars}
                        <StarRatingComponent
                            name="AverageRatings"
                            editing={false}
                            value={rating.stars}
                        /></li>
                    <li >{rating.comment}</li>
                </ul>
            )))
    }

    render() {
        return (
            <GoogleMap
                defaultZoom={12}
                defaultCenter={this.state.position}
            >

                {RestaurantsDatas.map((r, index) => (
                    <Marker
                        key={r.restaurantName + index}
                        position={{
                            lat: r.lat,
                            lng: r.long
                        }}
                        onClick={() => {
                            this.setSelectedRestaurant(r);
                        }}
                    />
                ))}

                {this.state.selectedRestaurant ? (
                    <InfoWindow
                        position={{
                            lat: this.state.selectedRestaurant.lat,
                            lng: this.state.selectedRestaurant.long
                        }}
                        onCloseClick={() => {
                            this.setSelectedRestaurant(null);
                        }}
                    >
                        <div>
                            <div>
                                <h5>
                                    {this.state.selectedRestaurant.restaurantName}
                                </h5>
                                {this.promptRatings()}
                            </div>

                        </div>

                    </InfoWindow>
                ) : null
                }



                {this.state.position && (
                    <Marker
                        position={{
                            lat: this.state.position.lat,
                            lng: this.state.position.lng
                        }}
                        icon={{
                            url: '/manOnAMap.svg',
                            scaledSize: new window.google.maps.Size(50, 50)
                        }}
                    />
                )}

            </GoogleMap >
        );
    }
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default class MapDone extends Component {
    render() {
        return (
            <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCUcHQj9ibjlhFlD2iZ-GEWeLIqFE5buXQ`
                }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        )
    }
}

