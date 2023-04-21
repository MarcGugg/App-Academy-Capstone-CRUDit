import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createPost } from "../../store/post"


function CreatePostForm() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {subcruditId} = useParams()

    const [header, setHeader] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    // useEffect
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const post = await dispatch(createPost(subcruditId, header, body, image))
        // await dispatch(createPost(subcruditId, header, body, image))

        // console.log('post dispatch', post)

        history.push(`/posts/${post.id}`)
    }

    return (
        <>
        <h1>Create Post Form</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Set your posts' header"/>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Wrtie the post body">Body</textarea>
            <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Inlcude an image to make your post stand out" />
            <button type="submit">Create Post</button>
        </form>
        </>
    )
}

export default CreatePostForm