
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS, ME, BOOK_ADDED } from './queries/queries'
import { useQuery, useApolloClient, useSubscription  } from '@apollo/client'


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('books-user-token') ? localStorage.getItem('books-user-token') : null)
  const [errorMessage, setErrorMessage] = useState(null)
  const[ user, setUser ] = useState(null)
  //const allBooksAndAuthors = useQuery(ALL_BOOKS_AND_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const allAuthors = useQuery(ALL_AUTHORS)
  //const me = useQuery(ME)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

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

  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook.title, 'added')
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })


  if (allBooks.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <button onClick={() => setPage('recommendations')}>recommendations</button> 
        : null }
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
        setUser={setUser}
        
      />

      <Recommendations 
        show={page === 'recommendations'}
        books = {allBooks.data}
        user={user}
        token={token}
      />

    </div>
  )
}

export default App