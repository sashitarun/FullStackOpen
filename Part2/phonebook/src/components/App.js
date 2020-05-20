import React, {useState} from 'react'

const App = () => {
    const [ persons, setPersons ] = useState([
      { name: 'Arto Hellas' , number : '040-1233424' }
    ]) 
    const [ newName, setNewName ] = useState('')
    const [ newNumber , setNewNumber] = useState('')
  
    const addContact = (event) =>
    {
        event.preventDefault()
        if((persons.findIndex((person) => person.name === newName)) !== -1)
        {
            window.alert(`${newName} is already added to phonebook`)
        }
        else
        {
            const contactObject =
            {
                name : newName,
                number : newNumber
            }
            setPersons(persons.concat(contactObject))
        }
        setNewName('')
        setNewNumber('')
    }

    const handleNameChange = (event) =>
    {
        setNewName(event.target.value)
    }
    const handleNumberChange = (event) =>
    {
        setNewNumber(event.target.value)
    }

    return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addContact}>
          <div>
            name: <input value={newName} onChange={handleNameChange}/> <br/>
            number: <input value={newNumber} onChange={handleNumberChange} />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Numbers</h2>
        {
            persons.map((person) => <p key={person.name}>{person.name} {person.number}</p>)
        }
      </div>
    )
  }
 export default App  