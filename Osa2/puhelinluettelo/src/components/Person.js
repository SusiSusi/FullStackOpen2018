import React from 'react'

const Person = ({ person }) => {
    return (
        <p>{person.name} {person.phone}</p>
    )
}

export default Person