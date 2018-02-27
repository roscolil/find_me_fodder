import React from 'react'
import axios from 'axios'

// import SearchInput from './SearchInput'
// import DisplayResults from './DisplayResults'

export default class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
    this.clickSearch = this.clickSearch.bind(this);

    this.state = {
      cuisine: '',
      headers: {
        headers: {'user-key': '1e35415e3b9627ff3ad8ace342afde9c'}
      }
    }
  }

  inputChange(e) {
    this.setState({
      cuisine: e.target.value
    })
  }

  clickSearch() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude
      var lon = position.coords.longitude
      var header = this.state.headers
      var url = `https://developers.zomato.com/api/v2.1/search?start=0&count=10&lat=${lat}&lon=${lon}&radius=5000&cuisines=${this.state.cuisine}`;

      axios.get(url, header)
      .then(res => {
        let nearbyResturants = res.data
        // this.setState({
        //   nearbyRestaurants: res.data
        //   // operation: 'Search'
        // })
      })
    })
  }

  render() {
    return <div>
        <input type="text" placeholder="cuisine" id="cuisine" value={this.state.cuisine} onChange={this.inputChange}></input>
        <button className="button" onClick={this.clickSearch}></button>
      </div>
  }
}
