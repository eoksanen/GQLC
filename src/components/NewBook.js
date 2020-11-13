import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK } from '../queries/queries'
import { useLazyQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS } from '../queries/queries'
import Notify from './Notify'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  

  const [ createBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS } ],
    onError: (error) => {
        notify(error.graphQLErrors[0].message)
    }
  })


  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

   createBook({ variables: { title,  author, published, genres} })
    
    console.log('add book...', createBook.variables)

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
    <div> <Notify errorMessage={errorMessage} /></div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook