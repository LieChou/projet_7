import React, { Component } from 'react';
import { SearchBar } from '..';

export default class Header extends Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="col-sm-4">
                    <a className="navbar-brand" href="/">PlacesToEat </a>
                </div>
                {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                    </ul>
                </div> */}
                <div className="col-sm-8">
                    <SearchBar
                        updateRestaurants={this.props.updateRestaurants}
                        updateRatings={this.props.updateRatings}
                        restaurants={this.props.restaurants}
                    />
                </div>
            </nav>
        )
    }
}