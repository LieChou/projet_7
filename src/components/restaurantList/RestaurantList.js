import React, { Component } from 'react';
import { RestaurantElement } from '..';

export default class RestaurantList extends Component {

    render() {
        return (
            <div className="d-flex flex-column justify-content-center">
                {this.props.restaurants.map((r, index) => (
                    <RestaurantElement
                        key={r.restaurantName + index}
                        restaurant={r}
                        setAverageRatings={() => this.props.setAverageRatings(r)}
                    />
                ))}
            </div>
        )
    }
}
