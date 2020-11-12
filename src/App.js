
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS } from './queries/queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const allBooksAndAuthors = useQuery(ALL_BOOKS_AND_AUTHORS)
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
  
  console.log(allBooksAndAuthors)

  if (allBooksAndAuthors.loading)  {
    return <div>loading...</div>
  }

  const Notify = ({errorMessage}) => {
    if ( !errorMessage ) {
      return null
    }
    return (
      <div style={{color: 'red'}}>
        {errorMessage}
      </div>
    )
  }

  return (
    <div>
       <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors = {allBooksAndAuthors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books = {allBooksAndAuthors.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
        setError={notify} 
        
      />

    </div>
  )
}

export default App