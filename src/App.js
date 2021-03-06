import React, { Component } from 'react';
import { Header, RestaurantList, MapDone, Filter } from './components';
import RestaurantsDatas from './components/util/restaurants.json';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 48.856613,
        lng: 2.352222
      },
      restaurants: RestaurantsDatas,
      initialRestaurants: RestaurantsDatas,
      loaded: false,
      selectedRestaurant: null,
      averageValue: [],
      value: 5,
      inputvalue: 5,
      ratings: [],
      placeId: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //calculate average ratings
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
    let result = sum / length;
    let average = Number(result.toFixed(1));
    return average
  }

  //handle filter selection
  handleChange(event) {
    let inputvalue = event.target.value
    this.setState({
      value: inputvalue
    })
  }

  //manage filter submission
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
    console.log(this.state.restaurants)
  }

  updateRatings = (placeId, reviews) => {

    let placeIdRestaurant = this.state.restaurants.find((restaurant) => {
      return (restaurant.place_id === placeId)
    })

    reviews.forEach((review) => {
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

  onClickElement = (restaurant) => {
    console.log(restaurant);
    this.setState({
      selectedRestaurant: restaurant
    })
  }

  //update user marker location based on location
  updatePosition = (location) => {
    this.setState({
      position: {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }
    })
  }

  //handle user marker location change on drangEnd based on lat,lng
  onChangePosition = (searchLat, searchLng) => {
    this.setState({
      position: {
        lat: searchLat,
        lng: searchLng
      }
    })
    console.log(this.state.position.lat);
    console.log(this.state.position.lng);

  }

  render() {

    return (
      <div>

        <div>
          <Header
            restaurants={this.state.restaurants}
            setAverageRatings={this.setAverageRatings}
            updateRestaurants={this.updateRestaurants}
            updateRatings={this.updateRatings}
            onChangePosition={this.onChangePosition}
          />
        </div>

        <div className="row">
          <div className="col-sm-8">
            <div style={{ width: "100vw", height: "100vh" }}>
              <MapDone
                restaurants={this.state.restaurants}
                updateRestaurants={this.updateRestaurants}
                updateRatings={this.updateRatings}
                selectedRestaurant={this.state.selectedRestaurant}
                setSelectedRestaurant={this.onClickElement}
                position={this.state.position}
                updatePosition={this.updatePosition}
                onChangePosition={this.onChangePosition}
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
                onClickElement={this.onClickElement}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}




