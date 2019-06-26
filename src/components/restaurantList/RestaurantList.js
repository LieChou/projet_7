import React, { Component } from 'react';
import { RestaurantElement } from '..';

export default class RestaurantList extends Component {

    render() {
        return (
            <div className="d-flex flex-column addScrollBar p-0 ml-2">
                {this.props.restaurants.map((r, index) => (
                    <div key={r.restaurantName + index}>
                        <div>
                            <RestaurantElement
                                restaurant={r}
                                setAverageRatings={() => this.props.setAverageRatings(r)}
                                updateRestaurants={this.props.updateRestaurants}
                                restaurants={this.props.restaurants}
                                onCommentAdded={this.props.onCommentAdded}
                                onClick={this.props.onClickElement}
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
