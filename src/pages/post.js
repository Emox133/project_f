import React from 'react'

const Post = ({post}) => {
    const {subject, content} = post
    return (
        <div style={{marginTop: '3rem', fontSize: '1.6rem', textDecoration: 'underline'}}>
            <p>{subject}</p>
            <p>{content}</p>
        </div>
    )
}

export default Post
