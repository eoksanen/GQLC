import React, { useState, useEffect } from 'react'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS, BOOKS_BY_GENRE, ME } from '../queries/queries'
import { useQuery, useLazyQuery  } from '@apollo/client'


const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre ] = useState(null)
  const[ user, setUser ] = useState(null)
  const[ books, setBooks ] = useState(null)
  const [getMe, meResult] = useLazyQuery(ME) 
  const [testMe, testResult] = useLazyQuery(BOOKS_BY_GENRE) 

   const mee = useQuery(ME)
   console.log('me in Recommendations ', mee.data)


    const showMe = () => {
        getMe()
    }

    const showTestMe = () => {
        testMe({ variables: {byBackUser: true}})
    }

    useEffect(() => {
      console.log('query favorite genres from server by usercontext useEffect')
      if (testResult.data && props.token) {

        console.log('TEST RESULT',testResult.data.allBooks)
        setBooks(testResult.data.allBooks)

      }
    }, [testResult])

    useEffect(() => {
      console.log('genres locally, me data from server useEffect')
        if (meResult.data && props.token) {
          setBooks(props.books.allBooks.filter(b => (b.genres.includes(meResult.data.me.favoriteGenre))))
          console.log('TEST RESULT', props.books.allBooks.filter(b => (b.genres.includes(meResult.data.me.favoriteGenre))))
        }
      }, [meResult])


      useEffect(() => {
        console.log('useQuery useEffect')
        if (mee.data && props.token) {
          setBooks(props.books.allBooks.filter(b => (b.genres.includes(mee.data.me.favoriteGenre))))
          setUser(mee.data.me)
        }

      },[mee.data])

  if (!props.show) {
    return null
  }

  if(!props.token){
    return null
  }

  
  //console.log('props ', user)


  return (
    <div>
      <h2>recommendations</h2>

  <p>books in your favorite genre {user.favoriteGenre}</p>

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
          {books.map( a => 
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <button onClick={() => showMe()}>genres locally by me data from server</button>
      <button onClick={() => showTestMe()}>genres from server by userContext</button>
      <button onClick={() => setBooks(props.books.allBooks.filter(b => (b.genres.includes('cartoon'))))}>genres by cartoon</button>
    </div>
  )
}

export default Recommendations