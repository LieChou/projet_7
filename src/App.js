import React, { Component } from 'react';
import { Header, RestaurantList, RestaurantMap } from './components';
import { Restaurants } from './components/util/restaurants';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: Restaurants,
      selectedRestaurant: 0,
      loaded: false
    }
  }

  render() {
    return (
      <>
        <div>
          <Header />
        </div>

        <div>
          <RestaurantList />
        </div>
      </>
    )
  }
}


export default App;
