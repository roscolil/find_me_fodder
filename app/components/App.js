import React from 'react'
import axios from 'axios'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
    this.clickSearch = this.clickSearch.bind(this);

    this.state = {
      cuisine: '',
      nearbyRestaurants: [],
      operation: '',
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
    this.setState({
      operation: 'Getting location..'
    })

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = position.coords.latitude
      var lon = position.coords.longitude
      var header = this.state.headers
      var url =  `https://developers.zomato.com/api/v2.1/search?start=0&count=10&lat=${lat}&lon=${lon}&radius=5000&q=${this.state.cuisine}`;

      this.setState({
        operation: 'Searching for fodder..'
      })

      axios.get(url, header)
        .then(res => {
          this.setState({
            operation: 'Here are your results!',
            nearbyRestaurants: res.data.restaurants
          })
        })
    })
  }

  render() {

    const results = this.state.nearbyRestaurants

    return (
      <div>
        <header>
          <div>
            <h1>Find my Fodder</h1>
            <input type="text" placeholder="Cuisine" value={this.state.cuisine} onChange={this.inputChange}></input>
            <button  onClick={this.clickSearch}>Search</button>
            <br></br>
            <p>{this.state.operation}</p>
          </div>
              <br></br>
              <hr></hr>
        </header>

        <main>
            <div>
              { results.map(function(resultObj, index) {
                var item = resultObj.restaurant
                return (
                <div className="row" key={index}>
                  <div className="image">
                    <img  src={item.thumb} />
                  </div>
                  <div className="details">
                  <p>Name: <span>{item.name}</span></p>
                  <p>Cuisine: <span>{item.cuisines}</span></p>
                  <p>Rating: <span>{item.user_rating.aggregate_rating}</span></p>
                  <p>Votes: <span>{item.user_rating.votes}</span></p>
                  <p>Locality: <span>{item.location.locality}</span></p>
                  <p>Address: <span>{item.location.address}</span></p>

                  </div>
                </div>
                  )
              })}
            </div>

        </main>
      </div>
    )
  }
}
