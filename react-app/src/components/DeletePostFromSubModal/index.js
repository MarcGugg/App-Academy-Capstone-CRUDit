import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import OpenModalButton from '../OpenModalButton'
import { deletePostFromProfile } from "../../store/profile";
import { deletePostFromSub, getOneSub } from "../../store/subcrudit";
import { deletePost } from "../../store/post";
import { getAllPosts } from "../../store/post";
import { useParams } from "react-router-dom";

function DeletePostFromSub({postId, subName}) {
    console.log('POST ID', postId)
    const {closeModal} = useModal()
    // const {subName} = useParams()
    console.log('sub name in modal', subName)
    const dispatch = useDispatch()

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        // await dispatch(deletePostFromSub(postId)).then(closeModal)
        await dispatch(deletePost(postId))
        dispatch(getOneSub()).then(closeModal)
        await dispatch(getOneSub(subName))
        // window.location.reload();
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