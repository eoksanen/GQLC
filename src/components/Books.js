import React, { useState, useEffect } from 'react'
import {useLazyQuery} from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS, BOOKS_BY_GENRE } from '../queries/queries'

//import { FIND_AUTHORS } from '../queries'

const Books = (props) => {

  const [getBooksByGenre, result] = useLazyQuery(BOOKS_BY_GENRE) 
  const [all, allresult] = useLazyQuery(ALL_BOOKS) 
  const [books, setBooksByGenre] = useState(null)
  const [genres, setGenres ] = useState(null) 

  const showBooksByGenre = (genre) => {
    console.log('type ', typeof(g), ' ', genre)
    getBooksByGenre({ variables: {genreToSearch: genre}})
  }
  const showall = () => {
    all()
  }
useEffect(() => {
  console.log('first useEffect')
  setBooksByGenre(props.books.allBooks)
  const genres = []
  props.books.allBooks.map(book => book.genres.map(genre => {

   if(!genres.includes(genre)) { genres.push(genre) }
  setGenres(genres)
  }))
    
}, [])

  useEffect(() => {
    console.log('second useEffect')
    if (result.data) {
      setBooksByGenre(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    console.log('second useEffect')
    if (allresult.data) {
      setBooksByGenre(allresult.data.allBooks)
    }
  }, [allresult])

  if (!props.show) {
    return null
  }

  
  console.log('props ',props)
  console.log('genres ',genres)


  return (
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
      {genres.map(g => console.log(g))}
          {genres.map(genre => <button key={genre} onClick={() => showBooksByGenre(genre)}>{genre}</button> )}
          <button onClick={() => setBooksByGenre(props.books.allBooks)}>all</button>
          <button onClick={() => showall()}>ALL</button>
    </div>
  )
}

export default Books