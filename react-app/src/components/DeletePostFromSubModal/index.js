import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import OpenModalButton from '../OpenModalButton'
import { deletePostFromProfile } from "../../store/profile";
import { deletePostFromSub } from "../../store/subcrudit";

function DeletePostFromSub({postId}) {
    console.log('POST ID', postId)
    const {closeModal} = useModal()
    const dispatch = useDispatch()

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        await dispatch(deletePostFromSub(postId)).then(closeModal)
    }

    return (
        <>
        <h1>Delete Post</h1>
        <button onClick={handleDeleteClick}>Yes</button>
        <button onClick={closeModal}>No</button>
        </>
    )
}

export default DeletePostFromSub