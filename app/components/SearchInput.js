import React from 'react'
import axios from 'axios'
// import DisplayResults from './DisplayResults'
// import getLocation from '../../lib/GetLocation'
import './SearchInput.scss'

export default class SearchInput extends React.Component {

  constructor(props) {
    super(props)
    this.inputChange = this.inputChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    // this.searchResturants = this.searchResturants.bind(this);

    this.state = {
      cuisine: '',
      nearbyRestaurants: []
      // operation: 'Search'
    }
  }

  inputChange(e) {
    this.setState({
      cuisine: e.target.value,
    })
  }

  // searchResturants() {
  //
  // }


  // componentDidMount() {
  //   this.setState({
  //     operation: 'Checking location..'
  //   })
  //
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     // this.setState({
  //     //   operation: 'Fetching restaurants..'
  //     // })
  //
  //     let lat = position.coords.latitude;
  //     let lon = position.coords.longitude;
  //     var url = `https://developers.zomato.com/api/v2.1/search?start=0&count=10&lat=${lat}&lon=${lon}&radius=5000&cuisines=${this.state.cuisine}`;
  //     let header = {
  //       headers: {'user-key': '1e35415e3b9627ff3ad8ace342afde9c'}
  //     }
  //
  //
  //     // this.setState({
  //     //   operation: 'Search'
  //     // })
  //     axios.get(url, header)
  //     .then(res => {
  //       let nearbyResturants = res.data
  //       this.setState({
  //         nearbyRestaurants: res.data
  //         // operation: 'Search'
  //       })
  //     })
  //   })

  }

  render() {
    return <div>
      <div>
        <input type="text" placeholder="cuisine" id="cuisine" value={this.state.cuisine} onChange={this.inputChange}/>
        <input className="button" type="button" value="Search" onClick={this.searchResturants}></input>
      </div>
      <br></br>
        <br></br>
      <p>{this.state.operation}</p>
    </div>
  }
}
