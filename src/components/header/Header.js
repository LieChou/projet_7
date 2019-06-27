import React, { Component } from 'react';
import { SearchBar } from '..';

export default class Header extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="col-sm-4">
                    <a className="navbar-brand" href="/">PlacesToEat </a>
                </div>
                <div className="col-sm-8">
                    <SearchBar
                        updateRestaurants={this.props.updateRestaurants}
                        updateRatings={this.props.updateRatings}
                        restaurants={this.props.restaurants}
                        onChangePosition={this.props.onChangePosition}
                    />
                </div>
            </nav>
        )
    }
}