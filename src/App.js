import React, { Component } from 'react';
import { Header, RestaurantList } from './components';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import RestaurantsDatas from './components/util/restaurants.json';

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 48.856613, lng: 2.352222 }}
    >
      {RestaurantsDatas.map((r, index) => (
        <Marker
          key={r.restaurantName + index}
          position={{
            lat: r.lat,
            lng: r.long
          }}
        />
      ))}
    </GoogleMap >
  );
}
console.log(...RestaurantsDatas);
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




