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
        await dispatch(getOnePost(postId))
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
        <div className='blackBorder'>

        <div className='wholePostPageParent'>
        <div className='wholePostPage'>
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
            <h1 class="mb-6 text-5xl font-bold">{post.header}</h1>
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
        </div>
        </div>
            {/* {user ? 
            <div className='commentButton'>
                <div>
                    <p>Comment as <NavLink to={`/users/${user.username}/profile`}>{user.username}</NavLink></p>
                    <div className='commentInputParent'>
                    <textarea type='text' class='commentInput' placeholder='What are your thoughts?' value={commentText} onChange={(e) => setCommentText(e.target.value)}>Text</textarea>
                    </div>
                    <div className='submitButtonParent'>
                    <button className='submitComment' onClick={handleCommentPost} disabled={!commentText.length}>
                        Submit
                    </button>
                    </div>
                </div>
                
            </div>
            : ''} */}

            {user ? 
                <div>
                      <div class="max-w-2xl mx-auto px-4">
                        <div class="flex justify-between items-center mb-6">
                         <h2 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Comments</h2>
                        </div>
                    <form class="mb-6">
                    <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                     <label for="comment" class="sr-only">Your comment</label>
                        <textarea id="comment" rows="6"
                        class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..." required value={commentText} onChange={(e) => setCommentText(e.target.value)}></textarea>
                    </div>
                    <div className='submitButtonParent'>
                    <button type="submit"
                    onClick={handleCommentPost} disabled={!commentText.length}
                     class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-cyan-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                     Post comment
                    </button>
                    </div>
                </form>
                </div>
            </div>
            : ''}

        {/* COMMENTS BELOW */}
        {post.comments && Object.values(post.comments).length ?
        <div>
            {Object.values(post.comments).slice(0).reverse().map(comment => (
                <article class="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-900">
        <footer class="flex justify-between items-center mb-2">
            <div class="flex items-center">
                <p class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white"><img
                        class="mr-2 w-6 h-6 rounded-full"
                        src="https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"
                        alt="Michael Gough"/>{comment.author?.username}</p>
                {/* <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time></p> */}
            </div>
            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button">
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                    </path>
                </svg>
                <span class="sr-only">Comment settings</span>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div id="dropdownComment1"
                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton">
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                    </li>
                    <li>
                        <a href="#"
                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                    </li>
                </ul>
            </div>
        </footer>
        <p class="text-gray-500 dark:text-gray-400">{comment.text}</p>
        <div class="flex items-center mt-4 space-x-4">
            <button type="button"
                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                Reply
            </button>
                <div>
                        {user ? user.id === comment.authorId ? 
                        // <button onClick={handleCommentDelete}>Delete</button> //RENDER THIS BUTTON IN A CONTEXT COMPONENT. PASS IN COMMENT ID
                        <CommentDeleteButton comment={comment} />
                        : '' : ''}
                    {user ? user.id === comment.authorId ?
                    <NavLink to={`/comments/${comment.id}/edit`} style={{textDecoration: 'none' , color: 'darkgray', fontWeight: '500'}}>Edit</NavLink>
                    : '' : ''}
                </div>
        </div>
    </article>
            ))}
        </div>
        : ''}


        {/* original comment section */}
        {/* {post.comments && Object.values(post.comments).length ?
        <div className='commentsSection'>
            {Object.values(post.comments).slice(0).reverse().map(comment => (
                <div className='comment'>
                    <p className='commentAuthor'>by {comment.author?.username}</p>
                    <p className='commentText'>{comment.text}</p>
                    <div>
                        {user ? user.id === comment.authorId ? 
                        // <button onClick={handleCommentDelete}>Delete</button> //RENDER THIS BUTTON IN A CONTEXT COMPONENT. PASS IN COMMENT ID
                        <CommentDeleteButton comment={comment} />
                        : '' : ''}
                    {user ? user.id === comment.authorId ?
                    <NavLink to={`/comments/${comment.id}/edit`} style={{textDecoration: 'none' , color: 'darkgray', fontWeight: '500'}}>Edit</NavLink>
                    : '' : ''}
                    </div>
                </div>
            ))}
        </div>
        : ''} */}
        </div>
        </div>
        </div>

        </>
    )
}

export default OnePost