/* eslint-disable linebreak-style */
import React from 'react'
import { Form, Button } from 'semantic-ui-react'

const LoginForm = ({ login, notify, history }) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    login(e.target.username.value, e.target.password.value)
    notify(`welcome ${e.target.username.value}`, 'success', 5000)
    e.target.username.value = ''
    e.target.password.value = ''
    history.push('/blogs')
  }
  return(

    <div className='LoginForm'>
      <h2>sign in</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>username</label>
          <input name="username"/>
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input
            type="password"
            name="password"
          />
        </Form.Field>
        <Button type="submit">sign in</Button>
      </Form>
    </div>
  )
}


export default LoginForm