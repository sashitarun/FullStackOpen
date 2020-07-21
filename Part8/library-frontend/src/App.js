
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery} from '@apollo/client'
import { ALL_AUTHORS,ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')

 

  const authors_result = useQuery(ALL_AUTHORS)
  const books_result = useQuery(ALL_BOOKS)

  if ( authors_result.loading ) {
    return <div>authors loading...</div>
  }

  if( books_result.loading){
    return <div>books loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} authors = {authors_result.data.allAuthors}
      />

      <Books
        show={page === 'books'} books = {books_result.data.allBooks} 
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App