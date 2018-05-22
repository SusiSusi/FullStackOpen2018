import React from 'react'
import Person from './Person'


const Number = ({ persons, find, deletePerson }) => {
    const foundPersons = persons.filter(person => 
                         person.name.toUpperCase().includes(find.toUpperCase()))
    return (
        <div>
            <h2>Numerot</h2>
                <table>
                    <tbody>
                        {foundPersons.map(person => <Person key={person.name} person={person} 
                        deletePerson={deletePerson}/>)}
                    </tbody>
                </table>
        </div>
    )
}

export default Number