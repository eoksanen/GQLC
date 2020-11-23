  
import React from 'react'
import BornForm from './EditBorn'

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  if(!props.authors) {return null}
  const authors = props.authors ? props.authors.allAuthors : null
  console.log(props)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
            <BornForm authors={authors} />
      

      

    </div>
  )
}

export default Authors
