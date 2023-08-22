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
        <h2 class="flex justify-center mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">Edit Comment</h2>
        {/* <input type="text" value={text} onChange={(e) => setText(e.target.value)}> */}
    <div className='flex justify-center'>
    {/* <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label> */}
    <textarea id="message" value={text} onChange={(e) => setText(e.target.value)} rows="10" class=" justify-center block p-2.5 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
    {/* <button type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button> */}
        </div>        
        <div className="flex justify-end w-1/2">

        <button type="submit" className="mt-2 py-2.5 px-4 text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">Update</button>
        </div>
        {/* </input> */}
        </form>
        </>
    )
}

export default EditComment