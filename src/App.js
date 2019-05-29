import React, { Component } from 'react';
import { Header, RestaurantList } from './components';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import * as restaurantsData from './components/util/restaurants.json';

function Map() {
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 48.856613, lng: 2.352222 }}
      {...restaurantsData.map((r, index) => (
        <Marker
          key={r.restaurantName + index}
          position={{
            lat: r.lat,
            lng: r.long
          }}
        />
      ))}
    >
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [
        {
          restaurantName: "Bronco",
          address: "39 Rue des Petites Écuries, 75010 Paris",
          lat: 48.8737815,
          long: 2.3501649,
          ratings: [
            {
              stars: 4,
              comment: "Un excellent restaurant, j'y reviendrai ! Par contre il vaut mieux aimer la viande."
            },
            {
              stars: 5,
              comment: "Tout simplement mon restaurant préféré !"
            }
          ]
        },
        {
          restaurantName: "Babalou",
          address: "4 Rue Lamarck, 75018 Paris",
          lat: 48.8865035,
          long: 2.3442197,
          ratings: [
            {
              stars: 5,
              comment: "Une minuscule pizzeria délicieuse cachée juste à côté du Sacré choeur !"
            },
            {
              stars: 3,
              comment: "J'ai trouvé ça correct, sans plus"
            }
          ]
        },
        {
          restaurantName: "Natacho",
          address: "14 rue de la Paix, 75019 Paris",
          lat: 48.882570,
          long: 2.382630,
          ratings: [
            {
              stars: 4,
              comment: "Sympa! Belle découverte, je recommande"
            },
            {
              stars: 5,
              comment: "J'ai trouvé ça au top!"
            }
          ]
        },
        {
          restaurantName: "Angel",
          address: "30 rue Nazareth, 75003 Paris",
          lat: 48.863700,
          long: 2.361090,
          ratings: [
            {
              stars: 5,
              comment: "Belle cuisine gastronomique"
            },
            {
              stars: 3,
              comment: "Gastronomique et beaucoup trop cher"
            }
          ]
        }
      ],
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




