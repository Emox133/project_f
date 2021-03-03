import React, {useState, useContext} from 'react'
import axios from 'axios'

const PostsContext = React.createContext()

export function usePosts() {
  return useContext(PostsContext)
}

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState([])
  const [errors, setErrors] = useState({
    combinedMessage: ''
  })

  const getAllPosts = () => {
      axios.get('/posts').then(res => {
          if(res.status === 200) {
            setPosts(...posts, res.data.posts)
          }
      }).catch(err => {
          err.response && console.log(err.response)
      })
  }

  const createPosts = data => {
    axios.post('/posts', data)
    .then(res => {
        if(res.status === 201) {
            // Create new posts
            setErrors({
                subject: '',
                content: ''
            })

            setPosts(...posts, ...data)
            alert('post created')
            window.location.reload()
        }
    })
    .catch(err => {
        err.response && console.log(err.response)
        const msg = err.response && err.response.data.message
        setErrors({combinedMessage: msg})
    })
  }

  const value = {
      posts,
      setPosts,
      getAllPosts,
      createPosts,
      errors
  }

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  )
}