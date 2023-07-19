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
        {/* <h1>User Profile</h1>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
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
        <ul class="flex border-b">
          {/* border-l border-t border-r rounded-t gives each tab the active indicator when clicked */}
          <li class="-mb-px mr-1">
            {postsShow ? 
            <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#" onClick={handlePostsClick}>User Posts</a>
            : 
            <a class="bg-white inline-block border-l  py-2 px-4 text-blue-700 font-semibold" href="#" onClick={handlePostsClick}>User Posts</a>
            }
          </li>
          <li class="-mb-px mr-1">
            {subsShow ? 
            <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold border-r rounded-t border-l border-t" href="#" onClick={handleSubsClick}>User SubCRUDits</a>
            : 
            <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#" onClick={handleSubsClick}>User SubCRUDits</a>
            }
          </li>
          <li class="mr-1">
            <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Comments</a>
          </li>
          <li class="mr-1">
            <a class="bg-white inline-block py-2 px-4 text-blue-500 font-semibold hover:text-blue-800" href="#">Upvotes</a>
          </li>
        </ul>
            {/* <button onClick={handlePostsClick} className="rounded-lg px-4 py-2 bg-red-600 text-red-100 hover:bg-red-700 duration-300">User Posts</button> */}
            {/* <button onClick={handleSubsClick} className="userSubsButton">User SubCRUDits</button> */}
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
        {/* <div>
            <NavLink to={`/tailwind_test`}>TailwindTest</NavLink>
        </div> */}
        </>
    )
}

export default UserProfile