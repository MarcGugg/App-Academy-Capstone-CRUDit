import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getUserProfile } from "../../store/profile"



function UserProfile() {

    const {username} = useParams()
    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(getUserProfile(username))
    }, [dispatch])

    const userProfile = useSelector((state) => state.userProfiles.oneProfile)
    console.log('user profile', userProfile)

    return (
        <>
        <h1>User Profile</h1>
        <button>
        <NavLink to={'/'}>Posts</NavLink>
        </button>
        <button>
        <NavLink to={'/'}>SubCRUDits</NavLink>
        </button>
        </>
    )
}

export default UserProfile