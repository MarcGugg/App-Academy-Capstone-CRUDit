import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import OpenModalButton from '../OpenModalButton'
import { deletePostFromProfile } from "../../store/profile";

function DeletePost({postId}) {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    console.log('DELETE POST MODAL', postId)
    
    const handleDeleteClick = async (e) => {
        e.preventDefault()
        await dispatch(deletePostFromProfile(postId)).then(closeModal)
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