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
    const [valErrs, setValErrs] = useState([])
    // useEffect
    const handleSubmit = async (e) => {
        e.preventDefault()

        let errs = []
        if (!header) errs.push('Header is Required') 
        if (!body) errs.push('Body is Required')
        // if (!image.contains)
        setValErrs(errs)
        
        if (!errs.length) {
            const post = await dispatch(createPost(subcruditId, header, body, image))
            // await dispatch(createPost(subcruditId, header, body, image))
    
            console.log('post dispatch', post)
    
            history.push(`/posts/${post.id}`)
        }
    }

    return (
        <>
            <h1 className="postFormHeader">Create Post Form</h1>
        <div className="everything">

            <form onSubmit={handleSubmit} className="createPostForm">
                <div className="postHeaderParent">
                <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Set your posts' header" className="postHeaderInput"/>
                </div>
                {valErrs.length > 0 && !header ? <p>Header is Required</p> : ''}
                <div className="postBodyInputParent">
                <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write the post body" className="postBodyInput">Body</textarea>
                </div>
                {valErrs.length > 0 && !body ? <p>Body is Required</p> : ''}
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