import React from 'react'

const Person = ({ person, deletePerson }) => {
    return (
        <tr>
            <td>{person.name} {person.phone}</td>
            <td><button onClick={ () => deletePerson(person.id) }>Poista</button></td>            
        </tr>
    )
}

export default Person