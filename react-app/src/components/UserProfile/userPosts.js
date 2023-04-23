import { NavLink } from "react-router-dom"


function UserPosts(user={user}) {
    console.log('HELLO FROM POSTS')
    console.log('user posts',user.user)
    // const {user} = user

    if (!user) return null

    return (
        <>
        <h1>User Posts</h1>
        {user.user && Object.values(user.user).length ? 
            <div>
                {Object.values(user.user).map(post => (
                    <div>
                        <NavLink to={`/posts/${post.id}`}>
                        <h1>{post.header}</h1>
                        </NavLink>
                    </div>
                ))}
            </div>
        : ''}
        </>
    )
}

export default UserPosts