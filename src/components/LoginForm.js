import React, { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries/queries'

const LoginForm = ({ setError, setToken, setUser, show, setPage }) => {

  const [getMe, meResult] = useLazyQuery(ME)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      getMe()
      
      localStorage.setItem('books-user-token', token)
      setPage('recommendations')
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {

      if (meResult.data) {
        setUser(meResult.data.me)
      }
    }, [meResult])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }
  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm