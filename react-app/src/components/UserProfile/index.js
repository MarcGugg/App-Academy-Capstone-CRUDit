import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getUserProfile } from "../../store/profile"
import UserPosts from "./userPosts"
import UserSubs from "./userSubs"
import UserDetails from "./userDetails"

// import './Profile.css'

function UserProfile() {

    const {username} = useParams()
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(getUserProfile(username))
    }, [dispatch])

    const userProfile = useSelector((state) => state.userProfiles.oneProfile)
    console.log('user profile', userProfile)

    const [details, setDetails] = useState(false)
    const [postsShow, setPostsShow] = useState(true)
    const [subsShow, setSubsShow] = useState(false)

    const handleDetailsClick = () => {
        setDetails(true)
        setPostsShow(false)
        setSubsShow(false)
    }
    const handlePostsClick = () => {
        setDetails(false)
        setPostsShow(true)
        setSubsShow(false)
    }
    const handleSubsClick = () => {
        setDetails(false)
        setPostsShow(false)
        setSubsShow(true)
    }

    return (
        <>
        <h1>User Profile</h1>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
        {/* <button>
        <NavLink to={'/'}>Posts</NavLink>
        </button>
        <button>
        <NavLink to={'/'}>SubCRUDits</NavLink>
        </button> */}
        <div className="userProfileInfo">
            {/* <UserDetails user={userProfile}/> */}
            <h1>{userProfile.username}</h1>
            <h3>{userProfile.bio}</h3>
        </div>
        <div className="buttons">
            {/* <button onClick={handleDetailsClick} className="detailsButton">User Details</button> */}
            <button onClick={handlePostsClick} className="rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300">User Posts</button>
            <button onClick={handleSubsClick} className="userSubsButton">User SubCRUDits</button>
        </div>
        <div className="propCompenents">
            {
            // details ? 
            // <UserDetails user={userProfile}/>
            // : 
            postsShow ? 
            <UserPosts user={userProfile.posts}/>
            : subsShow ? 
            <UserSubs user={userProfile} />
            : ''}
        </div>
        <div>
            <NavLink to={`/tailwind_test`}>TailwindTest</NavLink>
        </div>
        </>
    )
}

export default UserProfile