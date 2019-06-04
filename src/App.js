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

  setAverageRatings = (r) => {
    let Rating = r.ratings.map((rating) => (
      rating.stars
    ));
    console.log(Rating)
    let length = Rating.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += Rating[i]
    }
    console.log(sum)
    let average = sum / length;
    return (
      average
    )
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="d-flex flex-row justify-content-center">
          <div className="w-25">
            <RestaurantList restaurants={this.state.restaurants} setAverageRatings={this.setAverageRatings} updateRestaurants={this.updateRestaurants} updateSelectedRestaurant={this.updateSelectedRestaurant} />
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




