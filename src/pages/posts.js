import React, {useState} from 'react'
import {usePosts} from '../contexts/postsContext'
import Post from './post'

function Posts() {
    const [fields, setFields] = useState({
      subject: '',
      content: ''
    })

    const {createPosts, errors, posts} = usePosts()

    const handleFieldsChange = e => {
        setFields({
            ...fields,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        const data = {
            ...fields
        }

        createPosts(data)
    }

    let allPosts = posts && posts.length > 0 && posts.map(post => {
        return <Post key={post._id} post={post}/>
    })

    return (
        <div className="welcome-container">
            <div className="welcome__box">
                <div className="welcome__title-box">
                    <h2 className="welcome__title">Kreiraj Nešto</h2>
                </div>
                <form className="welcome__form" onSubmit={handleSubmit}>
                    {errors.combinedMessage ? <span>{errors.combinedMessage}</span> : null}
                    <input className={errors.combinedMessage ? 'error' : null} type="text" placeholder="Subject" name="subject" onChange={handleFieldsChange}/>
                    {errors.combinedMessage ? <span>{errors.combinedMessage}</span> : null}
                    <input className={errors.combinedMessage ? 'error' : null} type="text" placeholder="Content" name="content" onChange={handleFieldsChange}/>

                    <button className="welcome__btn btn-2" type="submit">Potvrdi</button>
                </form>
            </div>
            {allPosts}
        </div>
    )
}

export default Posts
