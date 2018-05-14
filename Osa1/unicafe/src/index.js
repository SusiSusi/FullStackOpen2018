import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
    {text}
    </button>
)

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            hyva: 0,
            neutraali: 0,
            huono: 0
        }
    }

    klickHyva = () => {
        this.setState({
            hyva: this.state.hyva + 1,
        })
    }

    klickNeutraali = () => {
        this.setState({
            neutraali: this.state.neutraali + 1,
        })
    }

    klickHuono = () => {
        this.setState({
            huono: this.state.huono + 1,
        })
    }

    keskiarvo = () => {    
        const maara = this.state.hyva + this.state.neutraali + this.state.huono
        if (maara === 0) {
            return 0
        }
        return ((this.state.hyva * 1) + (this.state.huono * -1)) / maara
    }

    positiivisia = () => {
        const maara = this.state.hyva + this.state.neutraali + this.state.huono
        if (maara === 0) {
            return 0
        }
        return this.state.hyva / maara * 100
    }

    render() {
        return(
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <Button
                    handleClick={this.klickHyva}
                    text={"Hyvä"}
                    />
                    <Button
                    handleClick={this.klickNeutraali}
                    text={"Neutraali"}
                    />
                    <Button
                    handleClick={this.klickHuono}
                    text={"Huono"}
                    />

                </div>
                <h1>Statistiikka</h1>
                <p>Hyvä: {this.state.hyva} </p>
                <p>Neutraali: {this.state.neutraali} </p>
                <p>Huono: {this.state.huono} </p>
                <p>Keskiarvo: {this.keskiarvo()} </p>
                <p>Positiivisia: {this.positiivisia()} % </p>
            </div>
        )
    }

}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
