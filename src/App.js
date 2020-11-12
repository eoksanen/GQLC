
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS } from './queries/queries'
import { useQuery } from '@apollo/client'

const App = () => {
  const [page, setPage] = useState('authors')
  const allBooksAndAuthors = useQuery(ALL_BOOKS_AND_AUTHORS)
  //const authors = useQuery(ALL_AUTHORS)
  //const books = useQuery(ALL_BOOKS)
  
  console.log(allBooksAndAuthors)

  if (allBooksAndAuthors.loading)  {
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
        authors = {allBooksAndAuthors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books = {allBooksAndAuthors.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App