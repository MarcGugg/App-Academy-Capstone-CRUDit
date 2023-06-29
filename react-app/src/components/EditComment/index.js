import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { getOneComment, editComment } from "../../store/post"
import { useDispatch, useHistory } from "react-redux"
// import { createPost } from "../../store/post"

function EditComment() {
    const dispatch = useDispatch()
    const history = useHistory()

    const {commentId} = useParams()

    useEffect(async () => {
        await dispatch(getOneComment(commentId))
    }, [dispatch])

    
    const commentToEdit = useSelector((state) => state.posts.singleComment)
    
    const [text, setText] = useState(commentToEdit.text || '')

    useEffect(() => {
        if (Object.values(commentToEdit).length) {
            setText(commentToEdit.text)
        }
    }, [commentToEdit, dispatch])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(editComment(commentId, text))
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        <h1>Edit Comment</h1>
        <input type="text" value={text} onChange={setText(e.target.value)}></input>
        <button type="submit">Update</button>
        </form>
        </>
    )
}

export default EditComment