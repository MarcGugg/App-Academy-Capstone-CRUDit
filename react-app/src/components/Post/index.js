import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams, useHistory } from 'react-router-dom'
import { getOnePost } from '../../store/post'

import './Post.css'

function OnePost() {

    const dispatch = useDispatch()
    const {postId} = useParams()
    const history = useHistory()

    useEffect(async () => {
        await dispatch(getOnePost(postId))
    }, [])

    const user = useSelector((state) => state.session.user)
    const post = useSelector((state) => state.posts.singlePost)

    // console.log('one post', post)

    //for dropdown menu
    // const [clicked, setClicked] = useState(false)

    const handleEditClick = async (e) => {
        e.preventDefault()
        history.push(`/posts/${postId}/edit`)
    }


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
            {user && post.authorId == user.id ? 
            <div>
                <button>Delete</button>
                <button onClick={handleEditClick}>Edit</button>
            </div>            
            : ''}
        </div>
        </div>
        </>
    )
}

export default OnePost