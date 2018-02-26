import React from 'react'
// import getLocation from '../../lib/GetLocation'
import './SearchInput.scss'

export default class SearchInput extends React.Component {

  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this);
    this.searchFunction = this.searchFunction.bind(this);

    this.state = {
      cuisine: '',
      nearbyRestaurants: [],
      action: 'Search'
    }
  }

  inputChange(e) {
    this.setState({
      cuisine: e.target.value
    });
  }

  searchFunction(e) {
    this.setState({
      operation: 'Checking location..'
    });

    navigator.geolocation.getCurrentPosition(function (position) {
      this.setState({
        operation: 'Fetching restaurants..'
      });

      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      var url = `https://developers.zomato.com/api/v2.1/search?start=0&count=10&lat=${lat}&lon=${lon}&radius=5000&cuisines=${this.state.cuisine}`;
      $.ajax({
        url: url,
        type: 'GET',
        beforeSend: function(request) {
          request.setRequestHeader('user-key', '1e35415e3b9627ff3ad8ace342afde9c');
        },
        success: function(result) {
          this.setState({
            nearbyRestaurants: result.restaurants,
            operation: 'Search'
          })
        }
      })
    })
  }

  render() {
    return <div>
      <div>
        <input type="text" placeholder="cuisine" id="cuisine" value={this.state.cuisine}
        onChange={this.inputChange} />
        <input className="button" type="button" value={this.state.action} onClick={this.searchFunction}></input>
      </div>
    </div>
  }
}
