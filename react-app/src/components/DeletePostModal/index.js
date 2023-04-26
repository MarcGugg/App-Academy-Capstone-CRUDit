import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton'
import { deletePostFromProfile, getUserProfile } from "../../store/profile";
import { deletePost } from "../../store/post";
import { useHistory } from "react-router-dom";

function DeletePost({postId, username}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    console.log('DELETE POST MODAL', postId)
    const user = useSelector((state) => state.session.user)
    
    const handleDeleteClick = async (e) => {
        e.preventDefault()
        // await dispatch(deletePost(postId)).then(closeModal)
        await dispatch(deletePostFromProfile(postId)).then(closeModal)
        dispatch(getUserProfile(username))
        // history.push(`/user/${user.username}/profile`)
        window.location.reload();
    }

    return (
        <>
        <h1>Delete Post?</h1>
        <button onClick={handleDeleteClick}>Yes</button>
        <button onClick={closeModal}>No</button>
        </>
    )
}

export default DeletePost