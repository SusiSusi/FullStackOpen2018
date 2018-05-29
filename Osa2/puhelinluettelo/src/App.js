import React from 'react'
import Number from './components/Number'
import Notification from './components/Notification'
import personService from './services/persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      find: '',
      error: null
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  updatePerson = (found) => {
    if(window.confirm(`Päivitetäänkö ${found.name} puhelin?`)){
      const personObject = {
        name: found.name,
        phone: this.state.newPhone,
        id: found.id
      }
      personService
        .update(found.id, personObject)
        .then(response => {
          const persons = this.state.persons.filter(person => person.id !== found.id)
          this.setState({
            persons: persons.concat(personObject),
            newName: '',
            newPhone: '',
            error: `Henkilön ${personObject.name} puhelinnumero muutettu.`
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 3000);
        })
        .catch(error => {
          alert(`Henkilö ${found.name} on jo valitettavasti poistettu palvelimelta`)
          this.setState({ persons: this.state.persons.filter(n => n.id !== found.id) })
        })
      } 
      else {
        this.setState({
          persons: this.state.persons,
          newName: '',
          newPhone: ''
      })
    }
  }

  addPerson = (event) => {
    event.preventDefault()

    const found = this.state.persons.find(person => person.name === this.state.newName)

    if (found) {
      this.updatePerson(found)
    } else {
      const personObject = {
        name: this.state.newName,
        phone: this.state.newPhone
      }

      personService
        .create(personObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newPhone: '',
            error: `Henkilö ${personObject.name} lisätty onnistuneesti!`
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 3000);
        })
  }
  }

  handleDelete = (id) => {
    const person = this.state.persons.find(person => person.id === id)
    if(window.confirm(`Poistetaanko ${person.name}?`)){
      personService
        .deletePerson(id)
        .then( response => {
          const newPersons = this.state.persons.filter(person => person.id !== id)
          this.setState({ 
            persons: newPersons,
            error: `Henkilö ${person.name} poistettu.`
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 3000);
        })
        .catch(error => {
          alert(`Henkilö ${person.name} on jo valitettavasti poistettu palvelimelta`)
          this.setState({ persons: this.state.persons.filter(n => n.id !== id) })
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
        <Notification message={this.state.error} />
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
          <Number persons={this.state.persons} find={this.state.find} 
          deletePerson={this.handleDelete.bind(this)}/>
      </div>
    )
  }
}

export default App