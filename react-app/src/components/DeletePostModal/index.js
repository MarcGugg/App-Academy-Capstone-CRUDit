import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton'
import { deletePostFromProfile, getUserProfile } from "../../store/profile";
import { deletePost, getAllPosts } from "../../store/post";
import { useHistory } from "react-router-dom";

import './DeletePost.css'

function DeletePost({postId, username}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    console.log('DELETE POST MODAL', postId)
    const user = useSelector((state) => state.session.user)
    
    const handleDeleteClick = async (e) => {
        e.preventDefault()
        // await dispatch(deletePost(postId)).then(closeModal)
        await dispatch(deletePost(postId))
        await dispatch(getAllPosts())
        // await dispatch(getUserProfile())
        await dispatch(getUserProfile(username)).then(closeModal)
        // history.push(`/user/${user.username}/profile`)
        // window.location.reload();
    }

    return (
        <>
        <h1>Delete Post?</h1>
        <div className="deletePostButtonsParent">
            <div className="deletePostButtons">
                <button onClick={handleDeleteClick} className="yes">Yes</button>
                <button onClick={closeModal} className="no">No</button>
            </div>
        </div>
        </>
    )
}

export default DeletePost