import React, { useState, useEffect } from 'react'
import {useLazyQuery} from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, ALL_BOOKS_AND_AUTHORS, BOOKS_BY_GENRE, ME } from '../queries/queries'
import { useQuery, useApolloClient  } from '@apollo/client'


const Recommendations = (props) => {

    const [getMe, meResult] = useLazyQuery(ME) 

    const showMe = () => {
        getMe()
    }
    console.log('test  ti ', props.user)
    const bks = props.books.allBooks.filter(b => (b.genres.includes('refactoring')))
    useEffect(() => {
        console.log('second useEffect')
        if (meResult.data) {
          console.log('ME ', meResult.data)
        }
      }, [meResult])

  if (!props.show) {
    return null
  }

  if(!props.token){
    return null
  }

  
  console.log('props ',props)


  return (
    <div>
      <h2>recommendations</h2>

  <p>books in your favorite genre {props.fg}</p>

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
          {bks.map( a => 
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