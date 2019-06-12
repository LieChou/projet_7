import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class RestaurantElement extends Component {

    /*addNewRating = () => {
        this.props.restaurant.restaurantName
    }*/

    //addnewComment

    render() {
        return (
            <div className="d-flex flex-column justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h5>{this.props.restaurant.restaurantName}</h5>
                        <div>
                            <p>Moyenne des avis: {this.props.setAverageRatings(this.props.restaurant)}</p>
                            <StarRatingComponent
                                name="AverageRatings"
                                editing={false}
                                value={this.props.setAverageRatings(this.props.restaurant)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}