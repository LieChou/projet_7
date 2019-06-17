import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import RestaurantModal from '../../restaurantModal/RestaurantModal';

export default class RestaurantElement extends Component {

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
                        <div>
                            <RestaurantModal
                                restaurant={this.props.restaurant}
                                updateRestaurants={this.props.updateRestaurants}
                                restaurants={this.props.restaurants}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}