
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS } from './queries/queries'
import { useQuery, useApolloClient  } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('books-user-token') ? localStorage.getItem('books-user-token') : null)
  const [errorMessage, setErrorMessage] = useState(null)
  //const allBooksAndAuthors = useQuery(ALL_BOOKS_AND_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const allAuthors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  /* , {
    pollInterval: 10000
  })*/

  //const authors = useQuery(ALL_AUTHORS)
  //const books = useQuery(ALL_BOOKS)

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  
  console.log(allBooks)


  if (allBooks.loading)  {
    return <div>loading...</div>
  }



  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('add')}>add book</button> 
        : null }
        {!token ? <button onClick={() => setPage('login')}>login</button> 
        : <button onClick={() => logout()}>logout</button>}</div>

      <Authors
        show={page === 'authors'}
        authors = {allAuthors.data}
      />

      <Books
        show={page === 'books'}
        books = {allBooks.data}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
        token={token}
        
      />

      <LoginForm
        show={page === 'login'}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
        
      />

    </div>
  )
}

export default App