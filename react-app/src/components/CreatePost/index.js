import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createPost } from "../../store/post"

import './CreatePost.css'

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
            <h1 className="postFormHeader">Create Post Form</h1>
        <div className="everything">

            <form onSubmit={handleSubmit} className="createPostForm">
                <div className="postHeaderParent">
                <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Set your posts' header" className="postHeaderInput"/>
                </div>
                <div className="postBodyInputParent">
                <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write the post body" className="postBodyInput">Body</textarea>
                </div>
                <div className="postImageInputParent">
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Inlcude an image to make your post stand out" className="postImageInput"/>
                </div>
                <div className="postButtonParent">
                <button type="submit" className="postFormButton">Post</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default CreatePostForm