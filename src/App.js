import React, { Component } from 'react';
import { Header, RestaurantList } from './components';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import RestaurantsDatas from './components/util/restaurants.json';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: {
        lat: 48.856613,
        lng: 2.352222
      },
      selectedRestaurant: null
    }
  }

  setSelectedRestaurant = (r) => {
    this.setState({
      selectedRestaurant: r,
    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(location => {
      this.setState({
        position: {
          lat: location.coords.latitude,
          lng: location.coords.longitude
        }
      })
    });
  }

  promptRatings = () => {
    return (
      this.state.selectedRestaurant.ratings.map((rating, index) => (
        <ul>
          <li key={rating.stars + index}>{rating.stars}</li>
          <li key={rating.stars + index}>{rating.comment}</li>
        </ul>
      )))
  }

  render() {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={this.state.position}
      >

        {RestaurantsDatas.map((r, index) => (
          <Marker
            key={r.restaurantName + index}
            position={{
              lat: r.lat,
              lng: r.long
            }}
            onClick={() => {
              this.setSelectedRestaurant(r);
            }}
          />
        ))}

        {this.state.selectedRestaurant && (
          <InfoWindow
            position={{
              lat: this.state.selectedRestaurant.lat,
              lng: this.state.selectedRestaurant.long
            }}
            onCloseClick={() => {
              this.setSelectedRestaurant(null);
            }}
          >
            <div>
              {this.state.selectedRestaurant.restaurantName}
              {this.promptRatings()}
            </div>
          </InfoWindow>
        )}

        {this.state.position && (
          <Marker
            position={{
              lat: this.state.position.lat,
              lng: this.state.position.lng
            }}
            icon={{
              url: '/manOnAMap.svg',
              scaledSize: new window.google.maps.Size(50, 50)
            }}
          />
        )}

      </GoogleMap >
    );
  }
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

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
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyCUcHQj9ibjlhFlD2iZ-GEWeLIqFE5buXQ`
                }
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}




