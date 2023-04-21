import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { editPost, getOnePost } from "../../store/post"



function EditPostForm() {

    const {postId} = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect( async () => {
        await dispatch(getOnePost(postId))
    }, [dispatch])

    const postToEdit = useSelector((state) => state.posts.singlePost)
    // console.log('post to edit', postToEdit)

    const [header, setHeader] = useState(postToEdit.header || '')
    const [body, setBody] = useState(postToEdit.body || '')

    useEffect(() => {
        if (Object.values(postToEdit).length) {
            setHeader(postToEdit.header)
            setBody(postToEdit.body)
        }
    }, [postToEdit, dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        
        await dispatch(editPost(postId, header, body))

        // console.log('post dispatch', post)

        history.push(`/posts/${postId}`)
    }


    if (!postToEdit || !Object.values(postToEdit).length) {
        return null
    }

    return (
        <>
        <h1>Edit Post Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Change your posts' header"/>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Change the post body">Body</textarea>
            {/* <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Inlcude an image to make your post stand out" /> */}
            <button type="submit">Update Post</button>
        </form>
        </>
    )
}

export default EditPostForm