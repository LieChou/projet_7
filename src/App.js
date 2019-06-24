import React, { Component } from 'react';
import { Header, RestaurantList, MapDone, Filter } from './components';
import RestaurantsDatas from './components/util/restaurants.json';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: RestaurantsDatas,
      loaded: false,
      selectedRestaurants: [],
      averageValue: [],
      value: 5,
      inputvalue: 5,
      ratings : [],
      placeId: 0
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
    if (length === 0) {
      return 0
    }
    let sum = 0;
    for (let i = 0; i < length; i++) {
      sum += Rating[i]
    }
    let average = sum / length;
    return average
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
    let initialRestaurants = this.state.restaurants;
    initialRestaurants.map(async (restaurant) => {
      const averageValue = await this.setAverageRatings(restaurant)

      if (averageValue >= this.state.value) {
        arrayRestaurant.push(restaurant)
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

    updateRatings = (placeId, reviews) => {

      let placeIdRestaurant = this.state.restaurants.find((restaurant)=>{
        return (restaurant.place_id === placeId)
      })
      
      reviews.forEach((review)=>{
        placeIdRestaurant.ratings.push(review)
      })
      console.log(placeIdRestaurant.ratings)  
      this.setState({
        restaurants: this.state.restaurants
      })
      console.log(this.state.restaurants)
    }
  

  onCommentAdded = (restaurantName, newReview, newValue) => {
    this.state.restaurants.find((r) => {
      return (r.restaurantName === restaurantName)
    }).ratings.push({ stars: newValue, comment: newReview })

    this.setState({
      restaurants: this.state.restaurants
    })
  }


  render() {

    return (
      <div>
        <div>
          <Header
            restaurants={this.state.restaurants}
            setAverageRatings={this.setAverageRatings}
            updateRestaurants={this.props.updateRestaurants}
          />
        </div>
        <div>
          <Filter
            onSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            inputvalue={this.state.inputvalue}
          />
        </div>
        <div className="d-flex flex-row">
          <div className="w-25">
            <RestaurantList
              setAverageRatings={this.setAverageRatings}
              restaurants={this.state.restaurants}
              updateRestaurants={this.updateRestaurants}
              onCommentAdded={this.onCommentAdded}
            />
          </div>
          <div className="w-75">
            <div style={{ width: "100vw", height: "100vh" }}>
              <MapDone
                restaurants={this.state.restaurants}
                updateRestaurants={this.updateRestaurants}
                onCommentAdded={this.onCommentAdded}
                updateRatings={this.updateRatings}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}




