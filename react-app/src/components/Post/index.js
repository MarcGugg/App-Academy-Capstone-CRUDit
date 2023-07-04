import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams, useHistory } from 'react-router-dom'
import { deletePost, getOnePost, makeComment } from '../../store/post'

import './Post.css'
import { addMod } from '../../store/subcrudit'
import CommentDeleteButton from '../CommentDelete'

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
    const [commentFormShow, setCommentFormShow] = useState(false)
    const [commentText, setCommentText] = useState('')

    const handleEditClick = async (e) => {
        e.preventDefault()
        history.push(`/posts/${postId}/edit`)
    }

    const handleCommentPost = async (e) => {
        e.preventDefault()
        await dispatch(makeComment(postId, commentText))
        setCommentText('')
        //WRITE COMMENT THUNK AND PUT DISPATCH HERE
        //WRITE COMMENT THUNK AND PUT DISPATCH HERE
        //WRITE COMMENT THUNK AND PUT DISPATCH HERE
        //WRITE COMMENT THUNK AND PUT DISPATCH HERE
        //WRITE COMMENT THUNK AND PUT DISPATCH HERE
        //WRITE COMMENT THUNK AND PUT DISPATCH HERE
        //WRITE COMMENT THUNK AND PUT DISPATCH HERE
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
            
            {/* COMMENT BUTTON BELOW */}
            {user ? 
            <div className='commentButton'>
                <button onClick={() => setCommentFormShow(!commentFormShow)}>
                    Comment
                    {/* MAKE A FORM DISPLAY HERE ON CLICK */}
                    {/* USE A BOOLEAN TO TOGGLE DISPLAY ON AND OFF */}
                    {/* THEN PUT A BUTTON ON THE FORM TO HANDLE SUBMISSION */}
                </button>

                {commentFormShow ?
                <div>
                    <input type='text' name='commentText' value={commentText} onChange={(e) => setCommentText(e.target.value)}/>
                    <button className='submitComment' onClick={handleCommentPost}>
                        Submit
                    </button>
                </div>
                : ''}
                
            </div>
            : ''}
        </div>
        </div>

        {/* COMMENTS BELOW */}
        {post.comments && Object.values(post.comments).length ?
        <div className='commentsSection'>
            {Object.values(post.comments).map(comment => (
                <div className='comment'>
                    <p className='commentAuthor'>by {comment.author.username}</p>
                    <p className='commentText'>{comment.text}</p>
                    <div>
                        {user ? user.id === comment.authorId ? 
                        // <button onClick={handleCommentDelete}>Delete</button> //RENDER THIS BUTTON IN A CONTEXT COMPONENT. PASS IN COMMENT ID
                        <CommentDeleteButton comment={comment} />
                        : '' : ''}
                    </div>
                    {user ? user.id === comment.authorId ?
                    <NavLink to={`/comments/${comment.id}/edit`}>Edit</NavLink>
                    : '' : ''}
                </div>
            ))}
        </div>
        : ''}

        </>
    )
}

export default OnePost