import React from 'react'

const blogForm = ({onSubmit, handleChange, author, title, url}) => (
    <div>
          <h2>create new</h2>

          <form onSubmit={onSubmit}>
          <div>
            author 
            <input
            name="blogAuthor"
            value={author}
            onChange={handleChange}
            />
            </div>
            <div>
            title
            <input
            name="blogTitle"
            value={title}
            onChange={handleChange}
            />
            </div>
            <div>
            url 
            <input
            name="blogUrl"
            value={url}
            onChange={handleChange}
            />
            </div>
            <button type="submit">create</button>
          </form>
      </div>
  )

  export default blogForm