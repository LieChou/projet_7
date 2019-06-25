import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from "react-google-maps";
import StarRatingComponent from 'react-star-rating-component';
import { AddRestaurantModal } from '..';
import * as axios from 'axios';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: {
                lat: 48.856613,
                lng: 2.352222
            },
            selectedRestaurant: 0,
            selectedPlace: false,
            selectedPlaceLat: 0,
            selectedPlaceLng: 0,
            queryPlaces: [],
            placesApi: [],
            apiIsLoaded: false
        }
    }

    setSelectedRestaurant = (r) => {
        this.setState({
            selectedRestaurant: r,
        })
    }


    geolocation = () => {
        return (
            navigator.geolocation.getCurrentPosition(location => {
                this.setState({
                    position: {
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    }
                })
            })
        )
    }

    getPlacesData = () => {
        setTimeout(() => {
            //API Google-Places-Search-Nearby query based on geolocalisation if accepted
            let lat = this.state.position.lat;
            let lng = this.state.position.lng;
            axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=AIzaSyActrrpA2NipKHnS8ksfgblNKuMcJiB_lE`)
                .then(response => response.data.results)
                .then(placesApi => {
                    const places = placesApi.map(p => ({
                        restaurantName: p.name,
                        place_id: p.place_id,
                        lat: p.geometry.location.lat,
                        long: p.geometry.location.lng,
                        ratings: []
                    }))
                    places.forEach(p => this.getPlacesRatings(p.place_id))
                    const newRestaurants = this.props.restaurants.concat(places);
                    this.props.updateRestaurants(newRestaurants);
                    console.log(newRestaurants);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 2000)
    }

    getPlacesRatings = (place_id) => {
        setTimeout(() => {
            let placeId = place_id
            axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/details/json?&key=AIzaSyActrrpA2NipKHnS8ksfgblNKuMcJiB_lE&placeid=${placeId}&fields=reviews/rating,reviews/text`)
                .then(response => response.data.result.reviews)
                .then(reviews => {
                  const returnReviews = reviews.map(r => ({
                        stars: r.rating,
                        comment: r.text
                    }))
                    console.log(returnReviews)
                    this.props.updateRatings(place_id, returnReviews);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 2000)
    }

    componentDidMount() {
        this.getPlacesData();
    }


    promptRatings = () => {
        return (
            this.state.selectedRestaurant.ratings.map((rating, index) => (
                <ul key={rating + index} >
                    <li ><strong>Note:</strong> {rating.stars}
                        <StarRatingComponent
                            name="AverageRatings"
                            editing={false}
                            value={rating.stars}
                        /></li>
                    <li ><strong>Commentaire:</strong> {rating.comment}</li>
                </ul>
            )))
    }

    restaurantStreetView = (r) => {
        let lat = r.lat;
        let lng = r.long;
        let restaurantImage = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&fov=90&heading=235&pitch=10&key=AIzaSyCmj4tmdfPWfODhSUyPkGh7zTqEJzv65gc`
        return (
            restaurantImage
        )
    }

    handleClickOnMap = (e) => {
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();
        console.log(lat);
        console.log(lng);
        this.setState({
            selectedPlace: true,
            selectedPlaceLat: lat,
            selectedPlaceLng: lng
        })
    }

    onCloseClickonMap = () => {
        this.setState({
            selectedPlace: false
        })
    }


    render() {
        return (

            < GoogleMap
                defaultZoom={12}
                defaultCenter={{ lat: this.state.position.lat, lng: this.state.position.lng }}
                onClick={this.handleClickOnMap}
                geolocation={this.geolocation()}
            >

                {
                    this.props.restaurants.map((r, index) => (
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
                    ))
                }

                {
                    this.state.selectedPlace && (
                        <AddRestaurantModal
                            updateRestaurants={this.props.updateRestaurants}
                            restaurants={this.props.restaurants}
                            onCommentAdded={this.props.onCommentAdded}
                            selectedPlaceLat={this.state.selectedPlaceLat}
                            selectedPlaceLng={this.state.selectedPlaceLng}
                            onCloseClick={this.onCloseClickonMap}
                        />
                    )
                }

                {
                    this.state.selectedRestaurant && (
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
                                    <div>
                                        <div>
                                            <img
                                                src={this.restaurantStreetView(this.state.selectedRestaurant)}
                                                alt="restaurantStreetView"
                                            >
                                            </img>

                                        </div><br />
                                        <h5 className="text-center">
                                            {this.state.selectedRestaurant.restaurantName}
                                        </h5>
                                        <p className="w-500"><strong>Avis des internautes: </strong></p>
                                        {this.promptRatings()}
                                    </div>
                                </div>
                            </div>
                        </InfoWindow>
                    )
                }

                {
                    this.state.position && (
                        <Marker
                            position={{
                                lat: this.state.position.lat,
                                lng: this.state.position.lng
                            }}
                            icon={{
                                url: '/manOnAMap.svg',
                                scaledSize: new window.google.maps.Size(50, 50)
                            }}
                        >
                        </Marker>
                    )
                }

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
                restaurants={this.props.restaurants}
                updateRestaurants={this.props.updateRestaurants}
                onCommentAdded={this.props.onCommentAdded}
                updateRatings={this.props.updateRatings}

            />
        )
    }
}

