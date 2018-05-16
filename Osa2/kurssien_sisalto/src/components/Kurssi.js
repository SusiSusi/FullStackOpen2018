import React from 'react'

const Kurssi = ({ kurssi }) => {

    const Otsikko = ({ kurssi }) => <h1>{kurssi.nimi}</h1>
    
    const Sisalto = ({ kurssi }) => {
        const osat = kurssi.osat
        return(
            <div>
                {osat.map(osa => <Osa key={osa.id} osa={osa} />)}
            </div>
        )
    }
    
    const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia} </p>

    const Yhteensa = ({ kurssi }) => {
        const yhteensa = kurssi.osat.reduce((yhteensa, osa) => yhteensa + osa.tehtavia, 0)
        return(
            <p>Yhteensä: {yhteensa} tehtävää</p>
        )
    }

    return (
        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto kurssi={kurssi} />
            <Yhteensa kurssi={kurssi} />
        </div>
    )
}

export default Kurssi