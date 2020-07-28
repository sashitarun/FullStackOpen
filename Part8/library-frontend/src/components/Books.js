import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'


const Books = (props) => {
  const [genres,setGenres] = useState([])
  const [selectedGenre,setSelectedGenre] = useState(null)
  const [genreQuery,result] = useLazyQuery(ALL_BOOKS)
  const [filteredBooks, setFilteredBooks] = useState([])

  const books = props.books
  
  useEffect( () => {
    if(result.data){
      setFilteredBooks(result.data.allBooks)
    }
    books.forEach(book => {
      book.genres.forEach(g => {
        if(genres.length === 0 || !genres.find(genre => g === genre))
        {
          setGenres(genres.concat(g))
        }
      })
    })
  },[books,genres,result])


  if (!props.show) {
    return null
  }

  const onGenreClick = (genreName) => {
    if(genreName){
      setSelectedGenre(genreName)
      genreQuery({variables : { genre : genreName}})
    }
    else{
      setSelectedGenre(null)
      setFilteredBooks([])
    }
    
  }

  const BooksDisplay = () => {

    books.forEach(book => {
      book.genres.forEach(g => {
        if(genres.length === 0 || !genres.find(genre => g === genre))
        {
          setGenres(genres.concat(g))
        }
      })
    })

    if(filteredBooks.length )
    {
      return(
        <div>
          <h2>books</h2>
          <h3>Selected Genre is {selectedGenre}</h3>
          <table>
            <tbody>
              <tr>
                <th>books</th>
                <th>
                  author
                </th>
                <th>
                  published
                </th>
              </tr>
              {filteredBooks.map(a =>
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

    else 
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


  }

  return (
    <div>
      <BooksDisplay />
      <h2>genres</h2>
        {
          genres.map(g => {
            return <button key={g} onClick={() => onGenreClick(g)}>{g}</button>
          }) 
        }
      <button onClick={() => onGenreClick(null)}>show all</button>
    </div>
  )
}

export default Books