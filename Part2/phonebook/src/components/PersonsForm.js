import React from 'react'

const PersonForm = (props) =>
{
    return(
        <form onSubmit={props.addContact}>
          <div>
            {/* name: <input value={newName} onChange={(e) => setNewName(e.target.value)}/> <br/> */}
            name: <input onChange={props.handleNameChange} /> <br/>
            number: <input onChange={props.handleNumberChange} />
            {/* number: <input value={newNumber} onChange={(e)=> setNewNumber(e.target.value)} /> */}
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
}

export default PersonForm