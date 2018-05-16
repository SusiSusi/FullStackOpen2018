import React from 'react'
import Note from './components/Note'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notes: props.notes,
            newNote: 'uusi muistiinpano...',
            showAll: true
        }
    }

    addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: this.state.newNote,
            date: new Date().new,
            important: Math.random() > 0.5, 
            id: this.state.notes.lenght + 1
        }

        const notes = this.state.notes.concat(noteObject)

        this.setState({
            notes,
            newNote: ''
        })
    }

    handleNoteChange = (event) => {
        console.log(event.target.value)
        this.setState({ newNote: event.target.value })
    } 

    toggleVisible = () => {
        this.setState({ showAll: !this.state.showAll })
    }

    render() {
        const notesToShow = 
            this.state.showAll ? 
                this.state.notes : 
                this.state.notes.filter(note => note.important)

        const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'
        
        return (
            <div>
                <h1>Muistiinpanot</h1>
                <div>
                    <button onClick={this.toggleVisible}>
                    Näytä {label}
                    </button>
                </div>
                <ul>
                    {notesToShow.map(note => <Note key={note.id} note={note} />)}
                </ul>
                <form onSubmit={this.addNote}>
                    <input 
                        value={this.state.newNote} 
                        onChange={this.handleNoteChange}
                    />
                    <button type="submit">Tallenna</button>
                </form>
            </div>
        )
    }
}

export default App