import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { getAllPosts } from '../../store/post'

import './HomePage.css'
import { getAllSubsReal } from '../../store/subcrudit'
import { upvotePost } from '../../store/post'
import { downvotePost } from '../../store/post'
import { removeUpvote } from '../../store/post'
import { removeDownvote } from '../../store/post'

function HomePage() {

    const dispatch = useDispatch()

    
    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state) => state.posts.allPosts)
    
    useEffect(async () => {
        // debugger
        await dispatch(getAllPosts())
        await dispatch(getAllSubsReal())
        // await dispatch(getAllPosts())
    }, [dispatch])
    // console.log('posts', posts)

    const handleUpvote = async (e, postId) => {
        // debugger
        e.preventDefault()
        dispatch(upvotePost(postId))
    }

    const handleDownvote = async (e, postId) => {
        // debugger
        e.preventDefault()
        dispatch(downvotePost(postId))
    } 

    const handleRemoveUpvote = async (e, postId) => {
        e.preventDefault()
        dispatch(removeUpvote(postId))
    }

    const handleRemoveDownvote = async (e, postId) => {
        e.preventDefault()
        dispatch(removeDownvote(postId))
    }

    const upvoteCheck = (post) => {
        if (user) {
            for (let i = 0; i < post.upvotes.length; i++) {
                if (post.upvotes[i].id === user.id) {
                    return true
                }
            }
            return false
        }
        return false
    }

    const downvoteCheck = (post) => {
        if (user) {
            for (let i = 0; i < post.downvotes.length; i++) {
                if (post.downvotes[i].id === user.id) {
                    return true
                }
            }
            return false
        }
        
        return false
    }

    if (!Object.values(posts).length) {
        return null
    }

    return (
        <>
        <div className='wholePage'>
        <div className='headerAndCreateButtonParent'>
            {/* <div className='headerAndCreateButton'> */}
            {/* <h1 className='homePageText'>Home Page</h1> */}
            <div class="rounded bg-white mb-4 mt-12">
            <div class="p-3">
									<div class="h-8 -m-3 bg-no-repeat bg-100%" style={{backgroundImage: "url(https://www.redditstatic.com/desktop2x/img/id-cards/banner@2x.png)"}}>
									</div>
									<div>
										<div class="inline-flex items-center">
											<img src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png" class="h-16"/>
											<span class="text-lg ml-4 mt-6">Home Page</span>
										</div>
										<p class="font-normal mb-3 text-sm leading-normal">The best posts on CRUDit for you, pulled from the most active communities on the site. Hire Marc Guggenheim!</p>
										<button class="bg-blue-dark text-sm text-white font-semibold rounded px-4 py-2 w-full">CREATE POST</button>
									</div>
                                    {user ? 
                                        <div className='createSubButtonDiv'>
                                            <button className='bg-cyan-400 text-sm text-white font-semibold rounded px-4 py-2 w-full'>
                                                <NavLink to={'/subcrudits/create/new'} style={{textDecoration:'none'}}>
                                                    Create A New SubCRUDit
                                    
                                                </NavLink>
                                            </button>
                                        </div>
                                    : ''}
								</div>
            {/* </div> */}
            </div>
        </div>
        <div className='homePagePostParent'>
        {Object.values(posts).map(post => (
            // <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>
            // <div className='homePagePostLink'>
            //     <p className='author-subcrudit'>
            //         <p className='subcruditName'>
            //             <NavLink to={`/subcrudits/${post.subcrudit.name}`} 
            //             style={{textDecoration:'none', color:'black'}}>
            //                 {post.subcrudit.name}</NavLink>
            //             </p>
            //         <p className='authorUsername'>Posted by {post.author.username}</p>
            //     </p>
            //     <h1 className='postHeader'>{post.header}</h1>
            //     {Object.keys(post).includes('image') ? 
            //         <div className='postImage'>
            //             <img src={post.image.url}
            //                 onError={(e) => {
            //                     e.target.onerror = null
            //                     e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
            //                 }} 
            //                 alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
            //             className='postImageSrc'
            //             />
            //         </div>
            //     : ''}
            //     <div className='postBodyParent'>
            //         <p className='postBody'>
            //         {post.body}
            //         </p>
            //     </div>
            // </div>
            // </NavLink>
            <div style={{width:'44rem'}}>

                        <div class="py-2">
                        <div class="flex border border-grey-light-alt hover:border-grey rounded bg-white cursor-pointer">
                            <div class="w-1/12 flex flex-col text-center pt-2">
                                {user && upvoteCheck(post) ? 
                                // add handler for removing upvote 
                                     <button class="text-xs text-orange-500" onClick={(e) => handleRemoveUpvote(e, post.id)}>
                                     <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
                                 </button>
                                : 
                                
                                <button class="text-xs" onClick={(e) => handleUpvote(e, post.id)}>
                                    <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
                                </button>
                                }
                                
                                <span class="text-xs font-semibold my-1 mr-8" onClick={() => console.log(post,post.upvotes)}>{post.upvotes.length - post.downvotes.length}</span>
                                {/* <span class="text-xs font-semibold my-1" onClick={() => console.log(post,post.upvotes.length)}>{(post.upvotes.length - post.downvotes.length).toString()}</span> */}
                                
                                {user && downvoteCheck(post) ? 
                                // add handler for removing downvote 
                                 <button class="text-xs text-cyan-600" onClick={(e) => handleRemoveDownvote(e, post.id)}>
                                 <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10V2h6v8h5l-8 8-8-8h5z"/></svg>
                             </button>
                                : 
                                
                                <button class="text-xs" onClick={(e) => handleDownvote(e, post.id)}>
                                    <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10V2h6v8h5l-8 8-8-8h5z"/></svg>
                                </button>
                                }
                            </div>
            <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>
                            <div class="w-11/12 pt-2">
                                <div class="flex items-center text-xs mb-2">
                                    <p class="font-semibold no-underline hover:underline text-black flex items-center">
                                        <img class="rounded-full border h-5 w-5" src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"/>
                                        <span class="ml-2">{post.subcrudit?.name}</span>
                                    </p>
                                    <span class="text-grey-light mx-1 text-xxs">•</span>
                                    <span class="text-grey">Posted by</span>
                                    <p class="text-grey mx-1 no-underline">{post.author.username}</p>
                                    <span class="text-grey">2 hours ago</span>
                                </div>
                                <div>
                                    <h2 class="text-lg font-medium mb-1">{post.header}</h2>
                                </div>
                                <div className='image'>
                         
                                    {Object.keys(post).includes('image') ? 
                                    
                                    <img src={post.image.url} 
                                            onError={(e) => {
                                                e.target.onerror = null
                                                e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                            }} 
                                            alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                    className='postImageSrc-sub'/>
                               
                                    : ''}
                                    </div>

                                <div class="inline-flex items-center my-1">
                                    <div class="flex hover:bg-grey-lighter p-1">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-4 4v-4H2a2 2 0 0 1-2-2V3c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-8zM5 7v2h2V7H5zm4 0v2h2V7H9zm4 0v2h2V7h-2z"/></svg>
                                        <span class="ml-2 text-xs font-semibold text-grey">3k Comments</span>
                                    </div>
                                    <div class="flex hover:bg-grey-lighter p-1 ml-2">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.08 12.16A2.99 2.99 0 0 1 0 10a3 3 0 0 1 5.08-2.16l8.94-4.47a3 3 0 1 1 .9 1.79L5.98 9.63a3.03 3.03 0 0 1 0 .74l8.94 4.47A2.99 2.99 0 0 1 20 17a3 3 0 1 1-5.98-.37l-8.94-4.47z"/></svg>
                                        <span class="ml-2 text-xs font-semibold text-grey">Share</span>
                                    </div>
                                    <div class="flex hover:bg-grey-lighter p-1 ml-2">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M0 2C0 .9.9 0 2 0h14l4 4v14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5 0v6h10V2H5zm6 1h3v4h-3V3z"/></svg>
                                        <span class="ml-2 text-xs font-semibold text-grey">Save</span>
                                    </div>
                                    <div class="flex hover:bg-grey-lighter p-1 ml-2 rotate-90">
                                        <svg class="w-4 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/></svg>
                                    </div>
                                </div>
                            </div>
            </NavLink>
                        </div>
                    </div>
   </div>
        ))}
        </div>
        </div>
        </>
    )
}

export default HomePage