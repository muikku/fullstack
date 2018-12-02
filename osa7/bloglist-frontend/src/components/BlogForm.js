import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from './../reducers/blogReducer'
import { notify } from './../reducers/notificationReducer'

class blogForm extends React.Component {
    onSubmit = async (e) => {
            e.preventDefault()
            e.persist()
            const blogProperties = [e.target.blogAuthor.value, e.target.blogTitle.value, e.target.blogUrl.value]
        
            if(blogProperties.includes(undefined || null || "")){
              this.props.notify('all fields must be filled', "error", 5000)
              return null
            }
        
/*             this.blogForm.toggleVisibility()  TARVITAAN REDUCER?*/
        
            try{
            this.props.createBlog({
              author: e.target.blogAuthor.value,
              title: e.target.blogTitle.value,
              url: e.target.blogUrl.value,
              likes: 0
            })


            this.props.notify(`a new blog ${e.target.blogTitle.value} by ${e.target.blogAuthor.value} added`, "success", 5000)
            
            e.target.blogAuthor.value = ""
            e.target.blogTitle.value = ""
            e.target.blogUrl.value = ""
        
            }catch(exception){
              console.log(exception)
              this.props.notify('could not add blog :(', "error", 5000)
            }
    }
    render() {
        return (
            <div>
            <h2>create new</h2>
  
            <form onSubmit={this.onSubmit}>
            <div>
              author 
              <input
              name="blogAuthor"
/*               value={author}
              onChange={handleChange} */
              />
              </div>
              <div>
              title
              <input
              name="blogTitle"
/*               value={title}
              onChange={handleChange} */
              />
              </div>
              <div>
              url 
              <input
              name="blogUrl"
/*               value={url}
              onChange={handleChange} */
              />
              </div>
              <button type="submit">create</button>
            </form>
        </div>
        )
    }
} 

  export default connect(null, { createBlog, notify })(blogForm)