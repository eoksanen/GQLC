
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
  const [token, setToken] = useState(null)
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

  if (!token) {
    const errorMessage = "Please login first"
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  if (allBooks.loading)  {
    return <div>loading...</div>
  }



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

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
        
      />

    </div>
  )
}

export default App