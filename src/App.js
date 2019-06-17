import React, { Component } from 'react';
import { Header, RestaurantList, MapDone, Filter } from './components';
import RestaurantsDatas from './components/util/restaurants.json';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: RestaurantsDatas,
      initialRestaurants: RestaurantsDatas,
      loaded: false,
      selectedRestaurants: [],
      averageValue: [],
      value: 5,
      inputvalue: 5
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
    let length = Rating.length;
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += Rating[i]
    }
    let average = sum / length;
    return (
      average
    )
  }

  handleChange(event) {
    let inputvalue = event.target.value
    this.setState({
      value: inputvalue
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    let arrayRestaurant = [];
    this.state.initialRestaurants.map(async (restaurant) => {
      const averageValue = await this.setAverageRatings(restaurant)

      if (averageValue >= this.state.value) {
        arrayRestaurant.push(restaurant)
      } else {
        return;
      }
      this.setState({
        restaurants: arrayRestaurant,
        loaded: true
      })
    })
  }

  updateRestaurants = (newRestaurants) => {
    this.setState({
      restaurants: newRestaurants,
    })
  }


  render() {
    return (
      <div>
        <div>
          <Header
            restaurants={this.state.restaurants}
            setAverageRatings={this.setAverageRatings}
          />
        </div>
        <div>
          <Filter
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            inputvalue={this.state.inputvalue}
          />
        </div>
        <div className="d-flex flex-row justify-content-center">
          <div className="w-25">
            <RestaurantList
              setAverageRatings={this.setAverageRatings}
              restaurants={this.state.restaurants}
              updateRestaurants={this.updateRestaurants}
            />
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




