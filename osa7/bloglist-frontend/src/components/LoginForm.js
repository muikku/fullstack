/* eslint-disable linebreak-style */
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { notify } from './../reducers/notificationReducer'
import { login } from './../reducers/userReducer'
import { Redirect } from 'react-router-dom'

const LoginForm = (props) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    e.persist()

    const blogProperties = [e.target.username.value, e.target.password.value]
    if(blogProperties.includes(undefined || null || '')){
      props.notify('nothing to login', false, 5000)
      return null
    }

    const response = props.login(e.target.username.value, e.target.password.value)
    if(response){
      props.notify(`welcome ${e.target.username.value}`, true, 5000)
      e.target.username.value = ''
      e.target.password.value = ''
    } else {
      props.notify('login failed, wrong username and/or password', false, 5000)
    }
  }
  return(
    <div>
      {
        props.user ?
          <Redirect to='/blogs'/>
          :
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
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { login, notify })(LoginForm)