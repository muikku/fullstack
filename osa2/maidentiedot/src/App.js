import React from 'react';
import FilterForm from './components/FilterForm';
import ShowCountries from './components/ShowCountries';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      newSearch: '',
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({
          countries: response.data})
      })
  }

  searchContact = (event) => {
    event.preventDefault()

    this.setState({
      newSearch: event.target.value
    })
  }


  handleSearch = (event) => {
    this.setState({newSearch: event.target.value})
  }

  handleClick = (countryCode) => () => {
    this.setState({newSearch: countryCode}) 
  }

  render() {
    return (
      <div>
        {FilterForm(this.state.newSearch, this.handleSearch)}
        {ShowCountries(this.state.newSearch, this.state.countries, this.handleClick)}
      </div>
    )
  }
}

export default App;
