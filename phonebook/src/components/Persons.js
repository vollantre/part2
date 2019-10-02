import React from 'react'

const Person = ({p, handleClick}) => 
    <div>
        {p.name} {p.number}
        <button onClick={handleClick}>
            delete
        </button>
    </div>

const Persons = ({ filter, persons, handleClick }) => {
    if(filter === ''){
        return persons
                    .map(p =>
                        <Person 
                            p={p}
                            key={p.id}
                            handleClick={() => handleClick(p.id)}
                        />
                    )
    }

    return (
        persons
            .filter(p => new RegExp(filter, 'i').test(p.name)))
            .map(p => 
                <Person 
                    p={p}
                    key={p.id}
                    handleClick={() => handleClick(p.id)}
                />
            )
}

export default Persons