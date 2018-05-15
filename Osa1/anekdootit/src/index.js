import React from 'react'
import ReactDOM from 'react-dom'

const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>
    {text}
    </button>
)

const getRandomNumber = () => (
    Math.floor((Math.random() * anecdotes.length))
)

const addNewVote = (votes, index) => {
    const copyOfVotes = [...votes]
    if (copyOfVotes[index]) {
        copyOfVotes[index] += 1
    } else {
        copyOfVotes[index] = 1
    }
    return copyOfVotes
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
      votes: [0]
    }
  }

  onClick = () => {
    return () => {
        this.setState({
            selected: getRandomNumber()
        })
        }  
    }

    onClickVote = (anecdote) => {      
        const copyVotes = addNewVote(this.state.votes, anecdote)
        return () => {
            this.setState({
                votes: copyVotes
            })
       } 
    }

    countVotes = () => {
        if (this.state.votes[this.state.selected]) {
            return this.state.votes[this.state.selected]
        }
        return 0;
    }

  render() {
    return (
      <div>
        {this.props.anecdotes[this.state.selected]}
        <p> has {this.countVotes()} votes </p>
        <p></p>
        <Button handleClick={this.onClickVote(this.state.selected)}
        text={"Vote"}
        />
        <Button handleClick={this.onClick()}
        text={"Next anecode"}
        />
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)