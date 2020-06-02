import React from 'react'
//import personService from './services/persons'

function Persons({persons,filterName,contactDelete}) {

    // const contactDelete = ({person}) =>
    // {
    //     console.log(person)
    //    if(window.confirm(`Delete ${person.name} ?`))
    //    {
    //        console.log('Deleting ', person.name)
    //        personService.deletePerson(person.id)

    //        .then(person => {
    //            console.log('Successfully deleted')
    //            persons.filter(p => p.id !== person.id)
    //         })
    //        .catch(error => console.log("Failed"))
    //    }
    //    else console.log('No')
=======
    //        .then(person => console.log('Successfully deleted'))
    //        .catch(error => console.log("Failed"))
    //    }
    //    else console.log('No')
    //    window.location.reload(false)

    // }


    if(filterName === ''){
    return (
        <div>
            {
                persons.map((person) => 
                <p key={person.name}>

                    {person.name} {person.number}
                    <button onClick={() => contactDelete(person)} > delete </button>

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
