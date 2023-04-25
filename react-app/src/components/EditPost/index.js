import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { editPost, getOnePost } from "../../store/post"

import '../CreatePost/CreatePost.css'

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
            <h1 className="postFormHeader">Edit Post Form</h1>
        <div className="everything">

            <form onSubmit={handleSubmit} className="createPostForm">
                <div className="postHeaderParent">
                <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Change your posts' header" className="postHeaderInput"/>
                </div>
                <div className="postBodyInputParent">
                <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Change the post body" className="postBodyInput">Body</textarea>
                </div>
                {/* <div className="postImageInputParent">
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Inlcude an image to make your post stand out" className="postImageInput"/>
                </div> */}
                <div className="postButtonParent">
                <button type="submit" className="postFormButton">Update</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default EditPostForm