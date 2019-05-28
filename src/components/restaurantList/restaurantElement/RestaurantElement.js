import React, { Component } from 'react';
import RestaurantComments from '../../restaurantComments/RestaurantComments';

export default class RestaurantElement extends Component {

    click = () => {
        this.props.updateSelectedRestaurant(this.props.restaurant.restaurantName)
        return (
            <div className="card">
                <div className="card-body">
                    <div className="d-flex flex-column justify-content-center">
                        <RestaurantComments restaurant={this.props.restaurant.restaurantName} />
                    </div>
                </div>
            </div>

        )
    }

    render() {
        return (
            <div onClick={this.click} className="d-flex flex-column justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <h5>{this.props.restaurant.restaurantName}</h5>
                        <p>Moyenne des avis: {}</p>
                        <button>Ajouter un avis</button>
                    </div>
                </div>
            </div>
        )
    }
}