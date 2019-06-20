import React, { Component } from 'react';
import RestaurantModal from '../../restaurantModal/RestaurantModal';
import StarRatingNonEditing from './StarRatingNonEditing';

export default class RestaurantElement extends Component {


    render() {
        return (
            <div className="d-flex flex-column justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h5>{this.props.restaurant.restaurantName}</h5>
                        <div>
                            <p>Moyenne des avis: {this.props.setAverageRatings(this.props.restaurant)}</p>
                            <StarRatingNonEditing
                                setAverageRatings={this.props.setAverageRatings}
                            />
                        </div>
                        <div>
                            <RestaurantModal
                                restaurant={this.props.restaurant}
                                onCommentAdded={this.props.onCommentAdded}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}