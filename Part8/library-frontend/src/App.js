import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient} from '@apollo/client'
import {ALL_BOOKS } from './queries'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}


const App = () => {
  const [page, setPage] = useState('authors')
  const [token,setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    return () => {
      const localStorageToken = localStorage.getItem('library-user-token')
      if(localStorageToken) setToken(localStorageToken)
    }
  }, )

  const books_result = useQuery(ALL_BOOKS)

  if( books_result.loading){
    return <div>books loading...</div>
  }

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    },5000)
  }

  if(!token)
  {
    return(
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Notify errorMessage = {errorMessage} />
        <Authors
          show={page === 'authors'} setError={notify}
        />

        <Books
          show={page === 'books'} books = {books_result.data.allBooks} 
        />

        <LoginForm
        show = {page === 'login'} setError={notify} setToken={setToken} setPage = {setPage} />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => logout()}>log out</button>
      </div>

      <Authors
        show={page === 'authors'} setError = {notify}
      />

      <Books
        show={page === 'books'} books = {books_result.data.allBooks} 
      />

      <Recommend show={page === 'recommend'} />

      <NewBook
        show={page === 'add'} setError = {notify}
      />

    </div>
  )
}

export default App