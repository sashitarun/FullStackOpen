import React from 'react'

function Persons({persons,filterName,contactDelete}) {

    if(filterName === ''){
    return (
        <div>
            {
                persons.map((person) => 
                <p key={person.name}>
                    {person.name} {person.number} <button onClick={() => contactDelete(person)} > delete </button>
                </p>)
            }
        </div>
    )
    }
    else
    {
        var filteredPersons = persons.filter((person) =>
        {
            var name = person.name;
            var lowerName = name.toLowerCase()
            var lowerFilterName = filterName.toLowerCase()
            if(lowerName.includes(lowerFilterName) === true)
            {
                console.log(person)
                return person
            }
            else return null
        })
        return(
            <div>
                {
                    filteredPersons.map((person) =>
                     <p key={person.name}> 
                     {person.name} {person.number} <button onClick={() => contactDelete(person)} > delete </button>
                    </p>)
                }
            </div>
        )
    }
}

export default Persons