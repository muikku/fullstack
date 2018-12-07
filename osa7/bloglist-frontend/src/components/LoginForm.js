import React from 'react'
import { connect } from 'react-redux'
import { login } from './../reducers/userReducer'
import { notify } from './../reducers/notificationReducer'

const LoginForm = ({login, notify, history}) => {
  const handleSubmit = async (e) => {
    e.preventDefault()
    login(e.target.username.value, e.target.password.value)
    notify(`welcome ${e.target.username.value}`, "success", 5000)
    e.target.username.value = ''
    e.target.password.value = ''
    history.push('/blogs')
  }
return(
  
    <div className='LoginForm'>
      <h2>sign in</h2>
    <form onSubmit={handleSubmit}>
    <div>
      username 
      <input
      type="text"
      name="username"
      />
    </div>
    <div>
      password 
      <input
      type="password"
      name="password"
      />
    </div>
    <button type="submit">sign in</button>
    </form>
    </div>
  )
}


export default LoginForm