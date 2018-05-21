import React from 'react'

const Person = ({ person, onClickDelete }) => {
    return (
        <div>
        {person.name} {person.phone}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={onClickDelete}>Poista</button>
        </div>
    )
}

export default Person