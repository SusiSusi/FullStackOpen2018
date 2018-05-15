import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
    {text}
    </button>
)

const Statistics = (props) => (
    <tbody>
        <Statistic nimi={"Hyvä"} statistiikka={props.hyva} />
        <Statistic nimi={"Neutraali"} statistiikka={props.neutraali} />
        <Statistic nimi={"Huono"} statistiikka={props.huono} />
        <Statistic nimi={"Keskiarvo"} statistiikka={props.keskiarvo} />
        <Statistic nimi={"Positiivisia"} statistiikka={props.positiivisia} merkki={"%"} />
    </tbody>  
)

const Statistic = ({ nimi, statistiikka, merkki }) => (
    <tr>
        <td>{nimi}: {statistiikka} {merkki} </td>
    </tr>
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

    klikkaus = (arvo) => {
        if (arvo === 0) {
            return () => {
                this.setState({
                    hyva: this.state.hyva + 1,
                })
            } 
        } else if (arvo === 1) {
            return () => {
                this.setState({
                    neutraali: this.state.neutraali + 1,
                })
            }
        } else {
            return () => {
                this.setState({
                    huono: this.state.huono + 1,
                })
            }
        }
    }

    maara = () => {
        return this.state.hyva + this.state.neutraali + this.state.huono
    }

    keskiarvo = () => {  
        const maara = this.maara()  
        if (maara === 0) {
            return 0
        }
        return (((this.state.hyva * 1) + (this.state.huono * -1)) / maara).toFixed(1)
    }

    positiivisia = () => {
        const maara = this.maara()
        if (maara === 0) {
            return 0
        }
        return (this.state.hyva / maara * 100).toFixed(1)
    }

    tyhja = () => {
        if (this.maara() === 0) {
            return <p>Ei yhtään palautetta annettu</p>
        }
        return <table><Statistics hyva={this.state.hyva} neutraali={this.state.neutraali} 
        huono={this.state.huono} keskiarvo={this.keskiarvo()} 
        positiivisia={this.positiivisia()} /></table>
    }

    render() {
        return(
            <div>
                <h1>Anna palautetta</h1>
                    <div>
                        <Button
                        handleClick={this.klikkaus(0)}
                        text={"Hyvä"}
                        />
                        <Button
                        handleClick={this.klikkaus(1)}
                        text={"Neutraali"}
                        />
                        <Button
                        handleClick={this.klikkaus(2)}
                        text={"Huono"}
                        />
                    </div>   
                <h1>Statistiikka</h1>
                {this.tyhja()} 
            </div>            
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
