import React, {useState,useEffect} from 'react'
import Persons from './Persons'
import PersonsForm from './PersonsForm'
import Filter from './Filter'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
    const [ persons, setPersons ] = useState([]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber , setNewNumber] = useState('')
    const [ filterName , setFilterName] = useState('')
    const [ message, setMessage] =useState(null)
    const [ deleteMessage , setDeleteMessage] = useState(null)

  
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
                //console.log(person)
                personService.update(person.id , contactObject)
                .then(response => {setPersons(persons.map(p => p.id !== person.id ? p : contactObject ))})
                setMessage(`${newName}'s contact has been updated`)
                setTimeout(() => {
                  setMessage(null)
                }, 3000)
            }   
        }
        else
        {
           // console.log(newName)
            const contactObject =
            {
                name : newName,
                number : newNumber
            }

            personService.create(contactObject)
            .then(response =>
              setPersons(persons.concat(contactObject)))
            setMessage(`${newName}'s contact has been created`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)

        }
    }

    const deleteContact = (person) =>
    {
      // console.log(person)
      // const name = person.name
      // console.log(name)
      if(window.confirm(`Delete ${person.name} ?`))
         {
             console.log('Deleting ', person.name)
             personService.deletePerson(person.id)
             .then(person => {
                 console.log('Successfully deleted')
                 personService.getAll()
                  .then(person =>
                    {
                      setPersons(person)
                    })
              })
             .catch(error => console.log("Failed"))
             setDeleteMessage(`${person.name} is deleted from phonebook`)
             setTimeout(() => {
              setDeleteMessage(null)
            }, 3000)


         }
    }

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
        <Notification message={message} deleteMessage={deleteMessage} />
        <Filter handleFilterNameChange = {handleFilterNameChange}/>
        <h2>Add a new </h2> 
        <PersonsForm 
          addContact = {addContact} 
          handleNameChange = {handleNameChange}
          handleNumberChange = {handleNumberChange} />
        <h2>Numbers</h2>
        <Persons persons={persons} filterName ={filterName} contactDelete={deleteContact}/>
      </div>
    )
  }
 export default App  