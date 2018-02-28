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
      noOfResults: 0,
      headers: {
        headers: {'user-key': '1e35415e3b9627ff3ad8ace342afde9c'}
      },
      resultOffset: 0,
      distance: 0,
      sort: ''
    }
  }

  inputChange(e) {
    this.setState({
      cuisine: e.target.value
    })
  }

  clickSearch() {
    this.setState({
      operation: 'Getting location...'
    })

    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude
      let lon = position.coords.longitude
      let header = this.state.headers
      let searchRadius = 5000
      // let resultOffset = 0
      let url =  `https://developers.zomato.com/api/v2.1/search?start=${this.state.resultOffset}&count=10&lat=${lat}&lon=${lon}&radius=5000&q=${this.state.cuisine}&sort=${this.state.sort}`;


      this.setState({
        operation: 'Searching for fodder...'
      })

      axios.get(url, header)
        .then(res => {
          this.setState({
            operation: 'Here are your results!',
            nearbyRestaurants: res.data.restaurants,
            resultOffset: this.state.resultOffset + 10
          })
        })
    })
  }

  topScroll() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const results = this.state.nearbyRestaurants

    return (
      <div>
        <header>
          <div>
            <h1>Find my Fodder</h1>
            <input type="text" placeholder="Cuisine" id="cuisine__field" value={this.state.cuisine} onChange={this.inputChange}></input>
            <button  onClick={this.clickSearch}>Search</button>
            <br></br>
          </div>
              <br></br>
              <div className="select__boxes">
                <label>Distance</label>
                <select onChange={this.state.distance}>
                  <option value="500">500m</option>
                  <option value="1000">1km</option>
                  <option value="5000">5km</option>
                  <option value="10000">10km</option>
                  <option value="20000">20km</option>
                </select>

                <label>Sort By</label>
                <select onChange={this.state.sort}>
                  <option value="rating">Rating</option>
                  <option value="cost">Cost</option>
                </select>
              </div>
              <p>{this.state.operation}</p>
              <hr></hr>
        </header>

        <main>
            <div>
              { results.map(function(resultObj, index) {
                let item = resultObj.restaurant

                return (
                <div className="row" key={index}>
                  <div className="image">
                    <img src={item.thumb} />
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
              })
            }
            </div>
            <button onClick={ () => {this.clickSearch(); this.topScroll()} }>More..</button>
        </main>
      </div>
    )
  }
}
