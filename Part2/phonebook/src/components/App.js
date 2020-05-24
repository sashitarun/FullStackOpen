import React, {useState,useEffect} from 'react'
import Persons from './Persons'
import PersonsForm from './PersonsForm'
import Filter from './Filter'
import personService from './services/persons'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber , setNewNumber] = useState('')
    const [ filterName , setFilterName] = useState('')

  
    useEffect(() => {
      
      personService.getAll()
      .then(person =>
         {
           setPersons(person)
         })
    }, [])

    const addContact = (event) =>
    {
        event.preventDefault()
        event.target.reset()
        if((persons.findIndex((person) => (person.name === newName)  && (person.number === newNumber))) !== -1)
        {
            window.alert(`${newName} is already added to phonebook`)
        }
        else if((persons.findIndex((person) => (person.name === newName)  && (person.number !== newNumber))) !== -1)
        {
            if(window.confirm(`${newName} is already added to phonebook , replace the old number with the new one ? `))
            {
                const person = persons.find((p) => p.name === newName)
                const contactObject =
                {
                    name : newName,
                    number : newNumber,
                    id : person.id 
                }
                personService.update(person.id , contactObject)
                .then(response => {setPersons(persons.map(p => p.id !== person.id ? p : contactObject ))})
                //console.log(persons)
            }   
        }
        else if(newName === '' || newNumber === '') 
        {
          window.alert(`Some entry input is empty`)
        }
        else
        {
            const contactObject =
            {
                name : newName,
                number : newNumber
            }

            personService.create(contactObject)
            .then(response =>
              setPersons(persons.concat(contactObject)))

            // setPersons(persons.concat(contactObject))
        }
        setNewName('')
        setNewNumber('')
    }

    // const deleteContact = ({person}) =>
    // {

    // }

    const handleNameChange = (event) =>
    {
        setNewName(event.target.value)
        
    }
    const handleNumberChange = (event) =>
    {
        setNewNumber(event.target.value)   
    }
    const handleFilterNameChange = (event) =>
    {
        setFilterName(event.target.value)
    }
  

    return (
      <div>
        <h2>Phonebook</h2>
        <Filter handleFilterNameChange = {handleFilterNameChange}/>
        <h2>Add a new </h2> 
        <PersonsForm 
          addContact = {addContact} 
          handleNameChange = {handleNameChange}
          handleNumberChange = {handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={persons} filterName ={filterName}/>
      </div>
    )
  }
 export default App  