import React from 'react';
import ReactDOM from 'react-dom';

const Hello = (props) => {
    return (
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    const nimi = 'Miisa'
    const ika = '6'
   return(
       <div>
           <h1>Greetings</h1>
           <Hello name="Suvi" age={26 + 1} />
           <Hello name={nimi} age={ika} />
        </div> 
)
}

ReactDOM.render(<App />, document.getElementById('root'))
