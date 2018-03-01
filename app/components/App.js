import React from 'react'
import axios from 'axios'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.inputChange = this.inputChange.bind(this);
    this.clickSearch = this.clickSearch.bind(this);
    this.distanceChange = this.distanceChange.bind(this);
    this.sortChange = this.sortChange.bind(this);

    this.state = {
      cuisine: '',
      nearbyRestaurants: [],
      operation: '',
      noOfResults: 0,
      headers: {
        headers: {'user-key': '1e35415e3b9627ff3ad8ace342afde9c'}
      },
      resultOffset: 0,
      distance: 500 ,
      sort: 'real_distance'
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
      let url =  `https://developers.zomato.com/api/v2.1/search?start=${this.state.resultOffset}&count=10&lat=${lat}&lon=${lon}&radius=${this.state.distance}&q=${this.state.cuisine}&sort=${this.state.sort}`;

      this.setState({
        operation: 'Searching for fodder...'
      })

      axios.get(url, header)
        .then(res => {
          this.setState({
            operation: 'Here are your results!',
            nearbyRestaurants: res.data.restaurants,
            resultOffset: this.state.resultOffset + 10,
            noOfResults: res.data.results_found
          })
        })
    })
  }

  distanceChange(e) {
    this.setState({
      distance: e.target.value
    })
  }

  sortChange(e) {
    this.setState({
      sort: e.target.value
    })
  }

  topScroll() {         //append method
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  render() {
    const results = this.state.nearbyRestaurants
    const distanceList = this.state.distance
    const sortList = this.state.sort
    const cuisineInput = this.state.cuisine

    return (
      <div>
        <header>
          <div className="header__div">
            <h1>Find my Fodder</h1>
            <input type="text" placeholder="Cuisine" className="cuisine__field" value={cuisineInput} onChange={this.inputChange}></input>
            <div className="select__boxes">
              <div className="distance__box">
                <label>Distance</label>
                <select value={this.state.distance} onChange={this.distanceChange}>
                  <option value="500">500m</option>
                  <option value="1000">1km</option>
                  <option value="5000">5km</option>
                  <option value="10000">10km</option>
                  <option value="20000">20km</option>
                </select>
              </div>
              <div className="sort__box">
                <label>Sort By</label>
                <select value={this.state.sort} onChange={this.sortChange}>
                  <option value="real_distance">Distance</option>
                  <option value="rating">Rating</option>
                  <option value="cost">Cost</option>
                </select>
              </div>
            </div>
            <p className="progress_msg">{this.state.operation}</p>
            <button className="search__btn" onClick={this.clickSearch}>Search</button>
          </div>
        </header>

        <main>
            <div>
              <p className="number__results" style={{visibility: this.state.noOfResults === 0 ? 'hidden' : 'visible' }}>There are <span>{this.state.noOfResults}</span> total matches</p>
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
            <button className="more__btn" onClick={ () => {this.clickSearch(); this.topScroll()} }>More...</button>
        </main>
      </div>
    )
  }
}
