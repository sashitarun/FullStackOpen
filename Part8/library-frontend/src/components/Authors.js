import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CHANGE_YEAR, ALL_AUTHORS } from '../queries'

const Authors = (props) => {

  const [author,setAuthor]= useState('')
  const [born,setBorn] = useState('')

  const [changeBornYear] = useMutation(CHANGE_YEAR , {
    refetchQueries : [{query : ALL_AUTHORS}]
  })

  const submit = async (event) => {
    event.preventDefault()

    changeBornYear({variables : {name : author , setBornTo : Number(born)}})
    setAuthor('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }  

  const authors = props.authors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        Author name : 
        <select value={author} onChange={ ({target}) => setAuthor(target.value)}>
          {
            authors.map( a => 
              <option value = {a.name} key={a.name}>
                  {a.name}
              </option>
            )
          }
        </select> <br />
        Change year to : 
        <input
          type = 'number'
          value = {born}
          onChange = { ({target}) => setBorn(target.value)}
        />
        <button type='submit'>change</button>
      </form>
      
    </div>
  )
}

export default Authors
