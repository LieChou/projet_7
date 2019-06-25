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
    let initialRestaurants = this.state.initialRestaurants;
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

    console.log(this.state.restaurants)
  }

  updateRestaurants = (newRestaurants) => {
    this.setState({
      restaurants: newRestaurants,
      initialRestaurants: newRestaurants
    })
  }

    updateRatings = (placeId, reviews) => {

      let placeIdRestaurant = this.state.restaurants.find((restaurant)=>{
        return (restaurant.place_id === placeId)
      })
      
      reviews.forEach((review)=>{
        placeIdRestaurant.ratings.push(review)
      })
      this.setState({
        restaurants: this.state.restaurants
      })
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

        <div className="row">
          <div className="col-sm-8">
            <div style={{ width: "100vw", height: "100vh" }}>
              <MapDone
                restaurants={this.state.restaurants}
                updateRestaurants={this.updateRestaurants}
                onCommentAdded={this.onCommentAdded}
                updateRatings={this.updateRatings}
              />
            </div>
          </div>

          <div className="col-sm-4">
            <div className="d-flex flex-row col-sm-12 bg-white m-2">
              <Filter
                onSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                inputvalue={this.state.inputvalue}
              />
            </div>

            <div>
              <RestaurantList
                setAverageRatings={this.setAverageRatings}
                restaurants={this.state.restaurants}
                updateRestaurants={this.updateRestaurants}
                onCommentAdded={this.onCommentAdded}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}




