import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams, useHistory } from 'react-router-dom'
import { deletePost, getOnePost } from '../../store/post'

import './Post.css'
import { addMod } from '../../store/subcrudit'

function OnePost() {

    const dispatch = useDispatch()
    const {postId} = useParams()
    const history = useHistory()
    // const navigate = useNavigate()

    useEffect(async () => {
        await dispatch(getOnePost(postId))
    }, [])

    const user = useSelector((state) => state.session.user)
    const post = useSelector((state) => state.posts.singlePost)

    console.log('one post', post)

    //for dropdown menu
    // const [clicked, setClicked] = useState(false)

    const handleEditClick = async (e) => {
        e.preventDefault()
        history.push(`/posts/${postId}/edit`)
    }

    const handeDeleteClick = async (e) => {
        e.preventDefault()
        await dispatch(deletePost(postId))
        history.push('/')
    }

    const handleModClick = async (e) => {
        console.log('IDs', post.subcrudit.id, post.authorId)
        e.preventDefault()
        dispatch(addMod(post.subcrudit.id, post.authorId))
    }

    if (!Object.values(post).length) {
        return null
    }
    // const handleRedirect = (e) => {
    //     e.preventDefault()
    //     history.goBack()
    // }

    return (
        <>
        {/* <h1>Single Post</h1> */}
        <div className='postParent'>
        <div className='post'>
            <div className='subAndAuthor'>
                <p className='postSub'>
                <NavLink to={`/subcrudits/${post.subcrudit.name}`} style={{textDecoration: 'none', color: 'black'}}>
                {post.subcrudit.name} 
                </NavLink>
                </p>
            
                <p className='postAuthor'>
                Posted by
                <NavLink to={`/users/${post.author.username}/profile`} style={{textDecoration: 'none', color: 'gray'}}>
                {' '}{post.author.username}
                    </NavLink> 
                </p>
                
            </div>
            <h1>{post.header}</h1>
            {Object.keys(post).includes('image') ? 
                <div className='imageDiv'>
                    <img src={post.image.url}
                                        onError={(e) => {
                                            e.target.onerror = null
                                            e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                        }}
                    alt="https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                    className='imgTag'
                    />
                </div>  
            : ''}
            <p className='postBody'>{post.body}</p>
            {/* <button onClick={handleRedirect}>
                                                go back
                                        </button> */}
            <div className='editAndDeleteButtons'>
                {/* {user ? post.authorId == user.id || post.subcrudit.ownerId == user.id ? 
                <div>
                    <button onClick={handeDeleteClick}>Delete</button>
                </div>            
                : '': ''} */}
                {user && post.authorId == user.id ? 
                <button onClick={handleEditClick} className='postEditButton'>Edit</button>
                : ''}
                {/* {user && post.subcrudit.ownerId == user.id ? 
                <button onClick={handleModClick}>Make User a Mod</button>
                :''} */}
            </div>
        </div>
        </div>
        </>
    )
}

export default OnePost