import React, { Component } from 'react';
import { Formik } from 'formik';

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
                            placeholder="Search ..." onChange={handleChange} onBlur={handleBlur} />
                        <button className="btn btn-small btn-outline-primary" type="submit"
                            disabled={isSubmitting} >Submit</button>
                    </form>
                )}
            </Formik>
        )
    }
}