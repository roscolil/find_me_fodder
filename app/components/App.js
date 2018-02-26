import React from 'react'
import SearchInput from './SearchInput'

export default class App extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <h1>Find Me Fodder</h1>
      <SearchInput />
    </div>
  }
}
