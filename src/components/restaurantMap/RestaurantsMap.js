import React, { Component } from 'react';
import { GoogleMap, Marker, InfoWindow, withScriptjs, withGoogleMap } from "react-google-maps";
import StarRatingComponent from 'react-star-rating-component';
import { AddRestaurantModal } from '..';
import * as axios from 'axios';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPlace: false,
            selectedPlaceLat: 0,
            selectedPlaceLng: 0,
            queryPlaces: [],
            placesApi: [],
            apiIsLoaded: false
        }
        this.geolocation()
    }

    geolocation = () => {
        return (
            navigator.geolocation.getCurrentPosition(location => {
                this.props.updatePosition(location)
                this.getPlacesData();
            }, error => {
                console.warn(`ERREUR (${error.code}): ${error.message}`);
                this.getPlacesData();
            })
        )
    }

    //API Google-Places-Search-Nearby query based on geolocation if accepted
    getPlacesData = () => {
        setTimeout(() => {
            let lat = this.props.position.lat;
            let lng = this.props.position.lng;
            axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&key=${process.env.REACT_APP_GOOGLE_MAPS}`)
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
                    //const newRestaurants = this.props.restaurants.concat(places);
                    this.props.updateRestaurants(places);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000)
    }

    //gets ratings details  
    getPlacesRatings = (place_id) => {
        setTimeout(() => {
            let placeId = place_id
            axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/details/json?&key=${process.env.REACT_APP_GOOGLE_MAPS}&placeid=${placeId}&fields=reviews/rating,reviews/text`)
                .then(response => response.data.result.reviews)
                .then(reviews => {
                    const returnReviews = reviews.map(r => ({
                        stars: r.rating,
                        comment: r.text
                    }))
                    this.props.updateRatings(place_id, returnReviews);
                })
                .catch(err => {
                    console.log(err);
                });
        }, 2000)
    }

    // display ratings for each restaurant
    promptRatings = () => {
        return (
            this.props.selectedRestaurant.ratings.map((rating, index) => (
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
        let restaurantImage = `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=${lat},${lng}&fov=90&heading=235&pitch=10&key=${process.env.REACT_APP_GOOGLE_STREETVIEW}`
        return (
            restaurantImage
        )
    }

    handleClickOnMap = (e) => {
        let lat = e.latLng.lat();
        let lng = e.latLng.lng();
        this.setState({
            selectedPlace: true,
            selectedPlaceLat: lat,
            selectedPlaceLng: lng
        })
    }

    //returns lat,lng based on address
    handleGeocodingOnModal = (inputAddress, createNewArrayRestaurants) => {
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/geocode/json?address=${inputAddress}&key=${process.env.REACT_APP_GOOGLE_MAPS}`)
            .then(response => response.data.results[0].geometry.location)
            .then(location => {
                this.setState({
                    selectedPlaceLat: location.lat,
                    selectedPlaceLng: location.lng,
                })
                createNewArrayRestaurants(inputAddress, location.lat, location.lng)
            })
            .catch(err => {
                console.log(err);
            });
        console.log(this.state.selectedPlaceLat)

    }

    onCloseClickonMap = () => {
        this.setState({
            selectedPlace: false
        })
    }

    //user marker drag and drop management on coordinates
    onMarkerDragEnd = (coord) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng()

        this.props.onChangePosition(lat, lng)
        this.getPlacesData()
    }


    render() {
        return (

            < GoogleMap
                onChange={this.props.onChange}
                defaultZoom={13}
                center={{ lat: this.props.position.lat, lng: this.props.position.lng }}
                onClick={this.handleClickOnMap}
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
                                this.props.setSelectedRestaurant(r);
                            }}

                        />
                    ))

                }

                {
                    this.state.selectedPlace && (
                        <AddRestaurantModal
                            updateRestaurants={this.props.updateRestaurants}
                            restaurants={this.props.restaurants}
                            selectedPlaceLat={this.state.selectedPlaceLat}
                            selectedPlaceLng={this.state.selectedPlaceLng}
                            onCloseClick={this.onCloseClickonMap}
                            handleGeocodingOnModal={this.handleGeocodingOnModal}
                        />
                    )
                }

                {
                    this.props.selectedRestaurant && (
                        <InfoWindow
                            position={{
                                lat: this.props.selectedRestaurant.lat,
                                lng: this.props.selectedRestaurant.long
                            }}
                            onCloseClick={() => {
                                this.props.setSelectedRestaurant(null);
                            }}
                        >
                            <div>
                                <div>
                                    <div>
                                        <div>
                                            <img
                                                src={this.restaurantStreetView(this.props.selectedRestaurant)}
                                                alt="restaurantStreetView"
                                            >
                                            </img>

                                        </div><br />
                                        <h5 className="text-center">
                                            {this.props.selectedRestaurant.restaurantName}
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
                    this.props.position && (
                        <Marker
                            position={{
                                lat: this.props.position.lat,
                                lng: this.props.position.lng
                            }}
                            icon={{
                                url: '/manOnAMap.svg',
                                scaledSize: new window.google.maps.Size(50, 50)
                            }}
                            draggable={true}
                            onDragEnd={(coord) => { this.onMarkerDragEnd(coord) }}

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
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS}`
                }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                restaurants={this.props.restaurants}
                updateRestaurants={this.props.updateRestaurants}
                updateRatings={this.props.updateRatings}
                selectedRestaurant={this.props.selectedRestaurant}
                setSelectedRestaurant={this.props.setSelectedRestaurant}
                position={this.props.position}
                updatePosition={this.props.updatePosition}
                onChangePosition={this.props.onChangePosition}
            />
        )
    }
}

