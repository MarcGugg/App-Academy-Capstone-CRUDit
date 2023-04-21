import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams } from 'react-router-dom'
import { getOnePost } from '../../store/post'

import './Post.css'

function OnePost() {

    const dispatch = useDispatch()
    const {postId} = useParams()

    useEffect(async () => {
        await dispatch(getOnePost(postId))
    }, [])

    const post = useSelector((state) => state.posts.singlePost)

    console.log('one post', post)

    if (!Object.values(post).length) {
        return null
    }
    

    return (
        <>
        {/* <h1>Single Post</h1> */}
        <div className='postParent'>
        <div className='post'>
            <div className='subAndAuthor'>
                <p className='postSub'>
                <NavLink to={`/subcrudits/${post.subcrudit.id}`} style={{textDecoration: 'none', color: 'black'}}>
                {post.subcrudit.name} 
                </NavLink>
                </p>
            
                <p className='postAuthor'>
                Posted by {post.author.username}
                </p>
                
            </div>
            <h1>{post.header}</h1>
            {Object.keys(post).includes('image') ? 
                <div className='imageDiv'>
                    <img src={post.image.url}
                    className='imgTag'
                    />
                </div>  
            : ''}
            <p className='postBody'>{post.body}</p>
        </div>
        </div>
        </>
    )
}

export default OnePost