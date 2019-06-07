import React, { Component } from 'react';
import { Header, RestaurantList, MapDone, Filter } from './components';
import RestaurantsDatas from './components/util/restaurants.json';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: RestaurantsDatas,
      selectedRestaurant: [],
      loaded: false,
      selectedRestaurants: [],
      averageValue: [],
      value: 5,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  updateSelectedRestaurant = (index) => {
    this.setState({
      selectedRestaurant: index
    })
  }

  updateRestaurants = (restaurants) => {
    this.setState({
      restaurants,
      loaded: true
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
    this.setState({ value: event.target.value })
  }

  handleSubmit() {
    this.restaurants.map((restaurant) => {
      this.setState({
        averageValue: this.setAverageRatings(restaurant)
      })
      if (this.state.averageValue >= this.state.value) { //event.target.value
        this.state.selectedRestaurant.push(restaurant)
      } else { }

      return (
        this.setState({
          restaurants: this.state.selectedRestaurant,
          loaded: true
        })
      )
    })
  }


  render() {
    return (
      <div>

        <div>
          <Header
            restaurants={this.state.restaurants}
            setAverageRatings={this.setAverageRatings}
            updateRestaurants={this.state.updateRestaurants} />
        </div>
        <div>
          <Filter
            handleSubmit={() => this.handleSubmit}
            handleChange={() => this.handleChange}
            value={this.state.value} />
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




