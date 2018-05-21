import React from 'react'
import axios from 'axios'

const ShowCountryDetails = ( country ) => {
 // console.log('Millon täällä? ', country)
  return(
    <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <img src={country.flag} alt={""} />
        </div>
      )
}

const FindCountry = ({ countries, search }) => {
  const foundCoutries = countries.filter(country =>
  country.name.toUpperCase().includes(search.toUpperCase()))

  if (foundCoutries.length === 0) {
    return (
      <div>
      </div>
    )
  }

  if (foundCoutries.length === 1) {
   return ShowCountryDetails(foundCoutries[0])
  }

  if (foundCoutries.length > 10) {
    return (
      <div>
        <p>Too many maches, specify another filter</p>
      </div>
    )
  }

  if (foundCoutries.length > 0 && foundCoutries.length < 11) {
    return(
      <div>
        {foundCoutries.map(country => 
          <div key={country.name} onClick= {(e) => ShowCountryDetails(country)}>
            {country.name}
          </div>
        )}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      search: '',
      selected: ''
    }
  }

  componentDidMount() {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        this.setState({ countries: response.data })
      })
  }

  handleFindCountry = (event) => {
    this.setState({ search: event.target.value })
  }

  render() {
    return (
      <div>
      Find countries: 
      <input
        value={this.state.search}
        onChange={this.handleFindCountry}    
      />
      <div>
        {<FindCountry countries={this.state.countries} search={this.state.search} />}
      </div>
    </div>
    )
  }
}

export default App;
