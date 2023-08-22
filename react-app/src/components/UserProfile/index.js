import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useParams } from "react-router-dom"
import { getUserProfile } from "../../store/profile"
import UserPosts from "./userPosts"
import UserSubs from "./userSubs"
import UserDetails from "./userDetails"
import UserComments from "./userComments"
import UserUpvotes from "./userUpvotes"

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
    const [commentsShow, setCommentsShow] = useState(false)
    const [upvotesShow, setUpvotesShow] = useState(false)

    const handleDetailsClick = () => {
        setDetails(true)
        setPostsShow(false)
        setSubsShow(false)
    }
    const handlePostsClick = () => {
        setDetails(false)
        setPostsShow(true)
        setSubsShow(false)
        setCommentsShow(false)
        setUpvotesShow(false)
    }
    const handleSubsClick = () => {
        setDetails(false)
        setPostsShow(false)
        setSubsShow(true)
        setCommentsShow(false)
        setUpvotesShow(false)
    }
    const handleCommentsClick = () => {
      setDetails(false)
      setPostsShow(false)
      setSubsShow(false)
      setUpvotesShow(false)
      setCommentsShow(true)
    }
    const handleUpvotesClick = () => {
      setDetails(false)
      setPostsShow(false)
      setSubsShow(false)
      setCommentsShow(false)
      setUpvotesShow(true)
    }

    return (
        <>

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
            {commentsShow ? 
            <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold border-r rounded-t border-l border-t" href="#" onClick={handleCommentsClick}>Comments</a>
            :
            <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#" onClick={handleCommentsClick}>Comments</a>
            }
          </li>
          <li class="mr-1">
            {upvotesShow ? 
            <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold border-r rounded-t border-l border-t" href="#" onClick={handleUpvotesClick}>Upvotes</a>
            :
            <a class="bg-white inline-block py-2 px-4 text-blue-500 font-semibold hover:text-blue-800" href="#" onClick={handleUpvotesClick}>Upvotes</a>
            }
          </li>
        </ul>
        </div>
        <div className="propCompenents">
            {
 
            postsShow ? 
            <UserPosts user={userProfile.posts}/>
            : subsShow ? 
            <UserSubs user={userProfile} />
            : commentsShow ? 
            <UserComments comments={userProfile.comments}/>
            : 
            upvotesShow ? 
            <UserUpvotes upvotes={userProfile.upvotes}/>
            : ''}
        </div>

        {/* <div class="rounded bg-white mb-4">
								<div class="p-3">
									<div class="h-8 -m-3 bg-no-repeat bg-100%" style={{backgroundImage: "url(https://www.redditstatic.com/desktop2x/img/id-cards/banner@2x.png)"}}>
									</div>
									<div>
										<div class="inline-flex items-center">
											<img src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png" class="h-16"/>
											<span class="text-lg ml-4 mt-6">r/popular</span>
										</div>
										<p class="font-normal mb-3 text-sm leading-normal">The best posts on Reddit for you, pulled from the most active communities on Reddit. Check here to see the most shared, upvoted, and commented content on the internet.</p>
										<button class="bg-blue-dark text-sm text-white font-semibold rounded px-4 py-2 w-full">CREATE POST</button>
									</div>
								</div>
							</div> */}


        <div class="flex items-center h-screen w-full justify-center">

          <div class="max-w-xs">
            <div class="bg-white shadow-xl rounded-lg py-3">
              <div class="photo-wrapper p-2">
                <img class="w-32 h-32 rounded-full mx-auto" src="https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png" alt="John Doe" />
          </div>
          <div class="p-2">
            <h3 class="text-center text-xl text-gray-900 font-medium leading-8">{userProfile.username}</h3>
            <div class="text-center text-gray-400 text-xs font-semibold">
                <p>{userProfile.bio}</p>
            </div>
          </div>
          </div>
          </div>      

        </div>
        {/* <div>
            <NavLink to={`/tailwind_test`}>TailwindTest</NavLink>
        </div> */}
        </>
    )
}

export default UserProfile