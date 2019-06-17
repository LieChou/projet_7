import React, { Component } from 'react';
import { RestaurantElement } from '..';

export default class RestaurantList extends Component {

    render() {
        return (
            <div className="d-flex flex-column justify-content-center">
                {this.props.restaurants.map((r, index) => (
                    <div key={r.restaurantName + index}>
                        <div>
                            <RestaurantElement
                                restaurant={r}
                                setAverageRatings={() => this.props.setAverageRatings(r)}
                                updateRestaurants={this.props.updateRestaurants}
                                restaurants={this.props.restaurants}
                                onCommentAdded={this.props.onCommentAdded}
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
