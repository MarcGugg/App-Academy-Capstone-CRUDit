import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams, useHistory } from 'react-router-dom'
import { deletePost, getOnePost, makeComment, deleteComment } from '../../store/post'

function CommentDeleteButton({comment}) {

    const handleCommentDelete = async (e) => {
        e.preventDefault()
        await dispatch(deleteComment(comment.id)) 
    }

    return (
        <>
        <button onClick={handleCommentDelete}>Delete</button>
        </>
    )
}

export default CommentDeleteButton