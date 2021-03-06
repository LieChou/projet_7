import React, { Component } from 'react';
import { Formik } from 'formik';
import axios from 'axios';

export default class SearchBar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchBarLat: null,
            searchBarLng: null
        }
    }

    submit = (values, actions) => {
        console.log(values)
        let value = document.getElementById('searchPlaces').value

        //gets places for the search input value
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&radius=1500&type=restaurant&key=${process.env.REACT_APP_GOOGLE_MAPS}`)
            .then(response => response.data.results)
            .then(searchApi => {
                const searchPlaces = searchApi.map(p => ({
                    restaurantName: p.name,
                    place_id: p.place_id,
                    lat: p.geometry.location.lat,
                    long: p.geometry.location.lng,
                    ratings: []
                }))
                searchPlaces.forEach(p => this.getPlacesRatings(p.place_id));
                this.props.updateRestaurants(searchPlaces)
            })
            .catch(err => {
                console.log(err);
            });

        // gets related ratings for more details
        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/geocode/json?address=${value}&key=${process.env.REACT_APP_GOOGLE_MAPS}`)
            .then(response => response.data.results[0].geometry.location)
            .then(location => {
                this.setState({
                    searchBarLat: location.lat,
                    searchBarLng: location.lng,
                })
                this.props.onChangePosition(this.state.searchBarLat, this.state.searchBarLng)
            })
            .catch(err => {
                console.log(err);
            });


        actions.setSubmitting(false)
    }

    //get ratings details 
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


    render() {
        return (
            <Formik
                onSubmit={this.submit}
                initialValues={{ query: '' }}
            >
                {({ handleSubmit, handleChange, handleBlur, isSubmitting }) => (
                    <form className="d-flex flex-row p-2 m-2" onSubmit={handleSubmit}>
                        <input id="searchPlaces" name="query" className="flex-fill form-control mr-2"
                            placeholder="Rechercher ..." onChange={handleChange} onBlur={handleBlur} />
                        <button className="btn btn-small btn-outline-primary" type="submit"
                            disabled={isSubmitting} >Rechercher</button>
                    </form>
                )}
            </Formik>
        )
    }
}