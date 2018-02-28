import React from 'react';
import './DisplayResults.scss';


export default class DisplayResults extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      nearbyRestaurants: []
    };
  }


  }

  render() {

      const result = this.state.nearbyRestaurants

      return <div>
          <div className="row" key={index}>
            <div className="column column-25">
              <img src={item.thumb} />
            </div>
            <div className="column">
              {peeps.map(function(peep, index) {
                return <p key={index}>{peep}</p>
              })}
            </div>
          </div>
      </div>

  }


}
