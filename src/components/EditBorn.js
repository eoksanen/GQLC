import React, { useState } from 'react'
import { EDIT_BORN } from '../queries/queries'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'

const BornForm = ({authors}) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeNumber ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
        //notify(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    changeNumber({ variables: { name, setBornTo: born } })

    setName('')
    setBorn('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>
        
      <select onChange={handleChange}>
  {authors.map(a => <option key={a.name} value={a.name}>{a.name}</option> )}
          </select>
            <br></br>
        </div>
        <div>
          born <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>change number</button>
      </form>
    </div>
  )
  }

export default BornForm