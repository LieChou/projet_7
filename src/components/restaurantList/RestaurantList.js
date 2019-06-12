import React, { Component } from 'react';
import { RestaurantElement, RestaurantModal } from '..';

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
                            />
                        </div>
                        <div>
                            <RestaurantModal
                                restaurant={r}
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
