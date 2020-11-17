import React, { useState } from 'react'
import { EDIT_BORN } from '../queries/queries'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS } from '../queries/queries'
import Select from 'react-select';

const BornForm = ({authors}) => {
 // const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [selectedOption, setSelectedOption] = useState(null)

  const [ changeNumber ] = useMutation(EDIT_BORN, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
        //notify(error.graphQLErrors[0].message)
    }
  })

  const options = authors.map(a => ({value: a.name, label: a.name}))

  console.log('test authors ', selectedOption )

  const submit = async (event) => {
    event.preventDefault()

    changeNumber({ variables: { name: selectedOption.value, setBornTo: born } })

    // setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={submit}>
        <div>

        <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
        
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