import React from 'react'

const LoginForm = ({handleSubmit, handleChange, username, password}) => {
return(
    <div className='LoginForm'>
      <h2>sign in</h2>
    <form onSubmit={handleSubmit}>
    <div>
      username 
      <input
      type="text"
      name="username"
      value={username}
      onChange={handleChange}
      />
    </div>
    <div>
      password 
      <input
      type="password"
      name="password"
      value={password}
      onChange={handleChange}
      />
    </div>
    <button type="submit">sign in</button>
    </form>
    </div>
  )
}

export default LoginForm