import React, { useState, useEffect } from 'react'
import {useLazyQuery} from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS, BOOKS_BY_GENRE, ME } from '../queries/queries'
import { useQuery, useApolloClient  } from '@apollo/client'


const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre ] = useState(null)
  const[ user, setUser ] = useState(null)
  const[ books, setBooks ] = useState(null)
  const [getMe, meResult] = useLazyQuery(ME) 
   const mee = useQuery(ME)
   console.log('me in Recommendations ', mee.data)



    const showMe = () => {
        getMe()
    }

    useEffect(() => {
        if (meResult.data && props.token) {
          setBooks(props.books.allBooks.filter(b => (b.genres.includes(meResult.data.me.favoriteGenre))))

          setUser(meResult.data.me.favoriteGenre)
        }
      }, [meResult])


      useEffect(() => {
        if (mee.data && props.token) {
          setBooks(props.books.allBooks.filter(b => (b.genres.includes(mee.data.me.favoriteGenre))))

          setUser(mee.data.me.favoriteGenre)
        }

      },[mee.data])

  if (!props.show) {
    return null
  }

  if(!props.token){
    return null
  }

  
  console.log('props ', user)


  return (
    <div>
      <h2>recommendations</h2>

  <p>books in your favorite genre {user}</p>

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
      <button onClick={() => showMe()}>kokeile painaa</button>
    </div>
  )
}

export default Recommendations