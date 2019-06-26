import React, { Component } from 'react';
import { Formik } from 'formik';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';



export default class SearchBar extends Component {

    submit = (values, actions) => {
        console.log(values);
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