import React, { Component } from 'react';

export default class RestaurantComments extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{this.props.restaurant.restaurantName}</h5>
                    <hr className="w-100" />
                    <div className="d-flex flex row" id="image Google Street View">

                    </div>
                    <p className="card-text">{this.props.restaurants.ratings.stars}</p>
                    <p className="card-text">{this.props.restaurants.ratings.comment}</p>

                </div>

            </div>
        )
    }
}