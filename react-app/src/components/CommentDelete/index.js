import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams, useHistory } from 'react-router-dom'
import { deletePost, getOnePost, makeComment, deleteComment } from '../../store/post'

import './CommentDelete.css'

function CommentDeleteButton({comment}) {
    const dispatch = useDispatch()

    const handleCommentDelete = async (e) => {
        e.preventDefault()
        console.log('COMMENT PROP', comment)
        await dispatch(deleteComment(comment.id)) 
    }

    return (
        <>
        <button onClick={handleCommentDelete} className='deleteButton'>Delete</button>
        </>
    )
}

export default CommentDeleteButton