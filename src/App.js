import React, { Component } from 'react';
import { Header, RestaurantList, MapDone } from './components';
import RestaurantsDatas from './components/util/restaurants.json';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: RestaurantsDatas,
      selectedRestaurant: 0,
      loaded: false
    }
  }

  updateRestaurants = (restaurants) => {
    this.setState({
      restaurants,
      loaded: true
    })
  }

  updateSelectedRestaurant = (index) => {
    this.setState({
      selectedRestaurant: index
    })
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="d-flex flex-row justify-content-center">
          <div className="w-25">
            <RestaurantList restaurants={this.state.restaurants} updateRestaurants={this.updateRestaurants} updateSelectedRestaurant={this.updateSelectedRestaurant} />
          </div>
          <div className="w-75">
            <div style={{ width: "100vw", height: "100vh" }}>
              <MapDone />
            </div>
          </div>
        </div>
      </div>
    )
  }
}




