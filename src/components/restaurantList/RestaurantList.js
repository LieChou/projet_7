import React, { Component } from 'react';
import { RestaurantElement } from '..';

export default class RestaurantList extends Component {

    render() {
        return (
            <div className="w-25 d-flew flex-column justify-content-center">
                {this.props.restaurants.map((r, index) => (
                    <RestaurantElement
                        key={r.restaurantName + index}
                        restaurant={r}
                        updateSelectedRestaurant={() => this.props.updateSelectedRestaurant(index)}
                    />
                ))}
            </div>
        )
    }
}
