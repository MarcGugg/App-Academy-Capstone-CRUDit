
import './Profile.css'

function UserDetails(user={user}) {
    console.log('HELLO FROM DETAILS')
    console.log(user.user)


    return (
        <>
        <div className='userDetailsParent'>
        <div className="userDetails">
        <h1>User Details</h1>
        <h1>{user.user.username}</h1>
        <h3>{user.user.bio}</h3>
        </div>
        </div>
        </>
    )
}

export default UserDetails