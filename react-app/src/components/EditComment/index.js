import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getOneComment, editComment } from "../../store/post"
import { useSelector } from "react-redux"
// import { createPost } from "../../store/post"

function EditComment() {
    const dispatch = useDispatch()
    const history = useHistory()

    const {commentId} = useParams()

    useEffect(async () => {
        console.log('USE EFFECT')
        await dispatch(getOneComment(commentId))
    }, [dispatch])

    
    const commentToEdit = useSelector((state) => state.posts.singleComment)
    
    const [text, setText] = useState(commentToEdit.text || '')

    useEffect(() => {
        if (Object.values(commentToEdit).length) {
            setText(commentToEdit.text)
            console.log('COMMENT TO EDIT', commentToEdit.text)
        }
    }, [commentToEdit, dispatch])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await dispatch(editComment(commentId, text))
        history.push(`/posts/${commentToEdit.postId}`)
    }

    // if (!Object.values(commentToEdit)) {
    //     return null
    // }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
        <button type="submit">Update</button>
        </form>
        </>
    )
}

export default EditComment