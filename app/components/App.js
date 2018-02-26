import React from 'react'
import SearchInput from './SearchInput'
import DisplayResults from './DisplayResults'

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <div>
        <h1>Find me Fodder</h1>
      </div>
      <br/>
      <div>
        <SearchInput/>
      </div>
      <br/>
      <br/>
      <hr/>
      <div>
        <DisplayResults/>
      </div>

    </div>
  }
}
