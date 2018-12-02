import React from 'react'
import { connect } from 'react-redux'
import { login } from './../reducers/userReducer'
import { notify } from './../reducers/notificationReducer'

class LoginForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault()
    const { login, notify } = this.props
    login(e.target.username.value, e.target.password.value)
    notify(`welcome ${e.target.username.value}`, "success", 5000)
    e.target.username.value = ''
    e.target.password.value = ''
  }
  render() {
return(
    <div className='LoginForm'>
      <h2>sign in</h2>
    <form onSubmit={this.handleSubmit}>
    <div>
      username 
      <input
      type="text"
      name="username"
/*       value={username} */
/*       onChange={handleChange} */
      />
    </div>
    <div>
      password 
      <input
      type="password"
      name="password"
/*       value={password} */
/*       onChange={handleChange} */
      />
    </div>
    <button type="submit">sign in</button>
    </form>
    </div>
  )
  }
}

export default connect(null, { login, notify })(LoginForm)