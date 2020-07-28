import React, { useState, useEffect } from 'react'


const Books = (props) => {
  const [genres,setGenres] = useState([])
  const [selectedGenre,setSelectedGenre] = useState(null)

  const books = props.books
  
  useEffect( () => {
    books.forEach(book => {
      book.genres.forEach(g => {
        if(genres.length === 0 || !genres.find(genre => g === genre))
        {
          setGenres(genres.concat(g))
        }
      })
    })
  },[books,genres])


  if (!props.show) {
    return null
  }

  const BooksDisplay = () => {
    if(!selectedGenre)
    {
      return(
        <div>
          <h2>books</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
                </th>
                <th>
                  published
                </th>
              </tr>
              {books.map(a =>
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )
    }

    else{
      
      return(
        <div>
          <h2>books</h2>
          <h3>Selected Genre is {selectedGenre}</h3>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
                </th>
                <th>
                  published
                </th>
              </tr>
              {books.map(a =>
              {
                if(a.genres.includes(selectedGenre))
                {
                  return(<tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                  </tr>)
                }
                else return null
              }
              )}
            </tbody>
            </table>
        </div>  
      )

    }

  }

  return (
    <div>
      <BooksDisplay />
      <h2>genres</h2>
        {
          genres.map(g => {
            return <button key={g} onClick={() => setSelectedGenre(g)}>{g}</button>
          }) 
        }
      <button onClick={() => setSelectedGenre(null)}>show all</button>
    </div>
  )
}

export default Books