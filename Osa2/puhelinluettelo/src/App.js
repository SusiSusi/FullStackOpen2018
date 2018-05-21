import React from 'react';
import Person from './components/Person'
import axios from 'axios'


const FindPerson = ({ persons, newName, find }) => {
  const foundPersons = persons.filter(person => 
    person.name.toUpperCase().includes(find.toUpperCase()))
    return(
      <div>
        {foundPersons.map(person => <Person key={person.name} person={person} />)}
    </div>
    )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      find: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()

    const found = this.state.persons.find(person => person.name === this.state.newName)

    if (found) {
      this.setState({
        persons: this.state.persons,
        newName: '',
        newPhone: ''
      })

    } else {
      const personObject = {
        name: this.state.newName,
        phone: this.state.newPhone
      }

      const persons = this.state.persons.concat(personObject)

      this.setState({
        persons,
        newName: '',
        newPhone: ''
      })
  }
  }

  handeNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handlePhoneChange = (event) => {
    this.setState({ newPhone: event.target.value })
  }

  handleFindPerson = (event) => {
    this.setState({ find: event.target.value })
  }

  render() {

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <div>
          Rajaa näytettäviä: 
          <input
            value={this.state.find}
            onChange={this.handleFindPerson}    
          />
        </div>
        <h2>Lisää uusi</h2>
        <form onSubmit={this.addPerson}>
          <div>
            Nimi: 
            <input 
              value={this.state.newName} 
              onChange={this.handeNameChange}  
            />
          </div>
          <div>
            Numero:
            <input
              value={this.state.newPhone}
              onChange={this.handlePhoneChange} 
            />
          </div>
          <div>
            <button type="submit">Lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <div>
          {<FindPerson persons={this.state.persons} newName={this.state.newName} find={this.state.find} />}
        </div>
        ...
      </div>
    )
  }
}

export default App