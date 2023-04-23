import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import { deletePostFromProfile } from "../../store/profile"
import DeletePost from "../DeletePostModal"
import OpenModalButton from '../OpenModalButton'

function UserPosts(user={user}) {
    console.log('HELLO FROM POSTS')
    console.log('user posts',user.user)
    // const {user} = user
    const currUser = useSelector((state) => state.session.user)

    // const handleDeleteClick = (e) => {
    //     e.preventDefault()
    // }

    if (!user) return null

    return (
        <>
        <h1>User Posts</h1>
        {user.user && Object.values(user.user).length ? 
            <div>
                {Object.values(user.user).map(post => (
                    <div className="postAndDelete">
                        <NavLink to={`/posts/${post.id}`}>
                        <h1>{post.header}</h1>
                        </NavLink>
                        {currUser && post.authorId == currUser.id ? 
                        <OpenModalButton modalComponent={<DeletePost postId={post.id}/>} buttonText={'Delete'}/>
                        : ''}
                    </div>
                ))}
            </div>
        : ''}
        </>
    )
}

export default UserPosts