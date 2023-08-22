import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useHistory, useParams } from "react-router-dom"
import { createPost } from "../../store/post"

// import './CreatePost.css'

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
        // <>
        //     <h1 className="postFormHeader">Create Post Form</h1>
        // <div className="everything">

        //     <form onSubmit={handleSubmit} className="createPostForm">
        //         <div className="postHeaderParent">
        //         <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Set your posts' header" className="postHeaderInput"/>
        //         </div>
        //         {valErrs.length > 0 && !header ? <p>Header is Required</p> : ''}
        //         <div className="postBodyInputParent">
        //         <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write the post body" className="postBodyInput">Body</textarea>
        //         </div>
        //         {valErrs.length > 0 && !body ? <p>Body is Required</p> : ''}
        //         <div className="postImageInputParent">
        //         <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Inlcude an image to make your post stand out" className="postImageInput"/>
        //         </div>
        //         <div className="postButtonParent">
        //         <button type="submit" className="postFormButton">Post</button>
        //         </div>
        //     </form>
        // </div>
        // </>
        <>
        <div className="bg-gray-100 min-h-screen flex justify-center items-center">
            <div className="w-full p-4">

    <h1 className="postFormHeader text-2xl font-bold mb-4 flex justify-center">Create Post</h1>
    <div className="everything flex justify-center">
        <form onSubmit={handleSubmit} className="createPostForm bg-white p-6 rounded-md shadow-md w-1/4">
            <div className="postHeaderParent mb-4">
                <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Set your post's header" className="postHeaderInput w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
            </div>
            {valErrs.length > 0 && !header ? <p className="text-red-500">Header is required</p> : ''}
            <div className="postBodyInputParent mb-4">
                <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write the post body" className="postBodyInput w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
            </div>
            {valErrs.length > 0 && !body ? <p className="text-red-500">Body is required</p> : ''}
            <div className="postImageInputParent mb-4">
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Include an image to make your post stand out" className="postImageInput w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500" />
            </div>
            <div className="postButtonParent">
                <button type="submit" className="postFormButton bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Post
                </button>
            </div>
        </form>
    </div>
            </div>
        </div>
</>

    )
}

export default CreatePostForm