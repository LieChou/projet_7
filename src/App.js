import React, { Component } from 'react';
import { Header, RestaurantList, RestaurantsMap } from './components';

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
          <div className="w-75">
            <RestaurantList restaurants={this.state.restaurants} updateRestaurants={this.updateRestaurants} updateSelectedRestaurant={this.updateSelectedRestaurant} />
          </div>
          <div className="w-25">
            <RestaurantsMap restaurants={this.state.restaurants} updateRestaurants={this.updateRestaurants} />
          </div>
        </div>
      </div>
    )
  }
}



