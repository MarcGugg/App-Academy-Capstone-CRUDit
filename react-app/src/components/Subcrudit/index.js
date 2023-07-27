import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useHistory, useParams } from 'react-router-dom'
import { deletePostFromSub, deleteSub, followSub, getAllSubs, getOneSub, unfollowSub } from '../../store/subcrudit'
import { deletePost, getAllPosts, getAuthors } from '../../store/post'
import { getPostImages } from '../../store/post_image'

import OpenModalButton from '../OpenModalButton'
import DeletePostFromSub from '../DeletePostFromSubModal'

import './Subcrudit.css'

function Subcrudit() {

    const dispatch = useDispatch()
    const history = useHistory()
    const {subName} = useParams()
    console.log('sub name', subName)

    useEffect(async () => {
        await dispatch(getOneSub(subName))
        // console.log('PICTURE CHECK', Object.keys(postImages).includes(post.id))
    }, [dispatch])

    const user = useSelector((state) => state.session.user)
    const sub = useSelector((state) => state.subcrudits.oneSubcrudit)
    // let following = false
    
    useEffect(async () => {
        if (Object.values(sub).length) {
            // for (let id in authorIdArr) {
            //     console.log('id in useEffect', id)
            //     let author = await dispatch(getAuthors(authorIdArr[id]))
            //     console.log('one author', author)
            //     authors.push(author)
            // }
            await dispatch(getAuthors(authorIdArr))
            await dispatch(getPostImages(postIdArr))
            await dispatch(getAllPosts())

            // for (let key of Object.keys(sub.users)) {
            //     if (parseInt(key) === user.id) {
            //         following = true
            //         break
            //     }
            // }
            // // console.log('does this user follow the sub: ',user ? Object.keys(sub.users).includes(String(user.id)): '')
            // console.log('does this user follow the sub: ', following)
        }
    }, [sub, dispatch])

    const authors = useSelector((state) => state.posts.authors)
    const postImages = useSelector((state) => state.postImages.imagesByPost)
    // console.log('authors from state', authors)
    // console.log('post images from state', postImages)
    // console.log('sub', sub)
    // console.log('posts', sub.posts)

    const authorIdArr = []
    const postIdArr = []
    for (let key in sub.posts) {
        authorIdArr.push(sub.posts[key].authorId)
        postIdArr.push(key)
    }
    // console.log('postIdArr', postIdArr)

    // let authors = []

    // console.log('AUTHOR IDS', authorIdArr)
    // console.log('AUTHORS', authors)
    useEffect(() => {
        console.log('POST IMAGES', postImages)
        console.log('POST IMAGES KEYS' ,Object.keys(postImages))
        console.log('PICTURE CHECK', Object.keys(postImages).includes('5'))
    }, [postImages])

    const handleDeleteClick = async (e) => {
        e.preventDefault()
        for (let post of Object.values(sub.posts)) {
            console.log('post', post)
            await dispatch(deletePost(post.id))
        }
        await dispatch(deleteSub(subName, sub.id))
        history.push('/')
    }

    const handleFollow = async (e) => {
        e.preventDefault()
        console.log('HANDLE FOLLOW')
        await dispatch(followSub(sub.id, user.id))
    }

    const handleUnfollow = async (e) => {
        e.preventDefault()
        console.log('HANDLE UNFOLLOW')
        await dispatch(unfollowSub(sub.id, user.id))
    }

    if (!sub || !Object.values(sub).length ) {
        return null
    }

    // || !sub || !authors
    //  || !Object.values(authors).length

    // if (postImages && !Object.values(postImages).length) {
    //     return null
    // }
    // const handleRedirect = (e) => {
    //     e.preventDefault()
    //     history.push(-1)
    // }

    return (
        <>
        <div className='wholeSub'>
            <div className='infoAndButtonBoxParent'>
            <div class="rounded bg-white mb-4 mt-12">
            <div class="p-3">
			    	<div class="h-8 -m-3 bg-no-repeat bg-100%" style={{backgroundImage: "url(https://www.redditstatic.com/desktop2x/img/id-cards/banner@2x.png)"}}>
			    	</div>
			    	<div>
			    		<div class="inline-flex items-center">
			    			<img src="https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png" class="h-16"/>
			    			<span class="text-lg ml-4 mt-6">{sub.name}</span>
			    		</div>
			    		<p class="font-normal mb-3 text-sm leading-normal">{sub.description}</p>
                        {user ? 
                        <NavLink to={`/subcrudits/${subName}/new_post`} style={{textDecoration: 'none', color: 'black'}}>
                            <button class="bg-cyan-400 text-sm text-white font-semibold rounded px-4 py-2 w-full">CREATE POST</button>
                        </NavLink>
                        : ''}
                        {user && sub.ownerId !== user.id ? !Object.keys(sub.users).includes(String(user.id)) ? 
                            <div className='followButtonDiv'>
                            <button className='bg-orange-600 text-sm text-white font-semibold rounded px-4 py-2 w-full mt-1' onClick={handleFollow}>
                                Join Community
                            </button>
                        </div>
                        : 
                        <div>
                        <button className='bg-orange-600 text-sm text-white font-semibold rounded px-4 py-2 w-full mt-1' onClick={handleUnfollow}>
                        Leave Community
                        </button>
                        </div> 
                        : ''
                        }
                        {user && user.id === sub.ownerId ? 
                            <div className='subEditAndDeleteButtons'>
                                <NavLink to={`/subcrudits/${subName}/edit`} style={{textDecoration: 'none', color: 'white'}}>
                                <button className='bg-cyan-400 text-sm text-white font-semibold rounded px-4 py-2 w-full mt-1'>
                                Edit Sub Info
                                </button>
                                </NavLink>
                                <button onClick={handleDeleteClick} className='bg-orange-600 text-sm text-white font-semibold rounded px-4 py-2 w-full mt-1'>Delete Sub</button>
                            </div>
                        : ''}
			    	</div>
			    </div>
            </div>
            <div class="rounded bg-white mb-4">
								<div class="p-3 text-xxs font-semibold w-full">MEMBERS</div>
                                {sub.users && Object.values(sub.users).length > 0 ? 
                                    <div>
                                        {Object.values(sub.users).map(user => (
                                            <div class="px-3 py-2">
                                            <div class="flex">
                                                <img class="h-8 w-8 border rounded-full mr-2" src="https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"/>
                                                <div class="flex flex-col font-medium">
                                                    <a href="#" class="text-xs text-black-alt no-underline leading-tight">{user.username}</a>
                                                    {/* <span class="text-xxs">1.000 subscribers</span> */}
                                                </div>
                                                <div class="flex ml-auto">
                                                    {/* <button class="bg-blue-dark text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button> */}
                                                </div>
                                            </div>
                                        </div>

                                        ))}
                                    </div>
                                : ''}
                                <div class="p-3 text-xxs font-semibold w-full">TRENDING COMMUNITIES</div>
									<div class="px-3 py-2">
										<div class="flex">
											<img class="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
											<div class="flex flex-col font-medium">
												<a href="#" class="text-xs text-black-alt no-underline leading-tight">r/tailwind</a>
												<span class="text-xxs">1.000 subscribers</span>
											</div>
											<div class="flex ml-auto">
												<button class="bg-blue-dark text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
											</div>
										</div>
									</div>
								<div class="pb-4">
									<div class="px-3 py-2">
										<div class="flex">
											<img class="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
											<div class="flex flex-col font-medium">
												<a href="#" class="text-xs text-black-alt no-underline leading-tight">r/tailwind</a>
												<span class="text-xxs">1.000 subscribers</span>
											</div>
											<div class="flex ml-auto">
												<button class="bg-blue-dark text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
											</div>
										</div>
									</div>
									<div class="px-3 py-2">
										<div class="flex">
											<img class="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
											<div class="flex flex-col font-medium">
												<a href="#" class="text-xs text-black-alt no-underline leading-tight">r/tailwind</a>
												<span class="text-xxs">1.000 subscribers</span>
											</div>
											<div class="flex ml-auto">
												<button class="bg-blue-dark text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
											</div>
										</div>
									</div>
									<div class="px-3 py-2">
										<div class="flex">
											<img class="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
											<div class="flex flex-col font-medium">
												<a href="#" class="text-xs text-black-alt no-underline leading-tight">r/tailwind</a>
												<span class="text-xxs">1.000 subscribers</span>
											</div>
											<div class="flex ml-auto">
												<button class="bg-blue-dark text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
											</div>
										</div>
									</div>
									<div class="px-3 py-2">
										<div class="flex">
											<img class="h-8 w-8 border rounded-full mr-2" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
											<div class="flex flex-col font-medium">
												<a href="#" class="text-xs text-black-alt no-underline leading-tight">r/tailwind</a>
												<span class="text-xxs">1.000 subscribers</span>
											</div>
											<div class="flex ml-auto">
												<button class="bg-blue-dark text-xs text-white font-semibold rounded px-4 ml-auto">SUBSCRIBE</button>
											</div>
										</div>
									</div>
								</div>
							</div>
                <div className='infoAndButtonBox'>
                {/* <h1>Subcrudit page</h1> */}
                <div className='subNameAndDesc'>
                    <h1 className='subName' >{sub.name}</h1>
                    <div className='subDescDisplayParent'>
                    <p className='subDescDisplay'>{sub.description}</p>
                    </div>
                </div>
                {user ? 
                    <div className='postButtonParent'>
                            <NavLink to={`/subcrudits/${subName}/new_post`} style={{textDecoration: 'none', color: 'black'}}>
                        <button className='postButton'>
                            Create Post
                        </button>
                            </NavLink>
                    </div>
                : ''}
                {user ? !Object.keys(sub.users).includes(String(user.id)) ? 
                <div className='followButtonDiv'>
                    <button className='followButton' onClick={handleFollow}>
                        Join Community
                    </button>
                </div>
                :
                <div>
                <button className='unfollowButton' onClick={handleUnfollow}>
                    Leave Community
                </button>
                </div> 
                : ''
                }
                {user && user.id === sub.ownerId ? 
                <div className='subEditAndDeleteButtons'>
                    <button className='subEditButton'>
                        <NavLink to={`/subcrudits/${subName}/edit`} style={{textDecoration: 'none', color: 'white'}}>
                        Edit Sub Info
                        </NavLink>
                    </button>
                    <button onClick={handleDeleteClick} className='subDeleteButton'>Delete Sub</button>
                </div>
                : ''}
                </div>
            </div>
            <div className='subPagePostParent'>
                        {/* <div class="py-2">
							<div class="flex border border-grey-light-alt hover:border-grey rounded bg-white cursor-pointer">
								<div class="w-1/12 flex flex-col text-center pt-2">
									<button class="text-xs">
										<svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
									</button>
									<span class="text-xs font-semibold my-1">20k</span>
									<button class="text-xs">
										<svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10V2h6v8h5l-8 8-8-8h5z"/></svg>
									</button>
								</div>
								<div class="w-11/12 pt-2">
									<div class="flex items-center text-xs mb-2">
										<a href="#" class="font-semibold no-underline hover:underline text-black flex items-center">
											<img class="rounded-full border h-5 w-5" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
											<span class="ml-2">r/tailwind</span>
										</a>
										<span class="text-grey-light mx-1 text-xxs">•</span>
										<span class="text-grey">Posted by</span>
										<a href="#" class="text-grey mx-1 no-underline hover:underline">u/TestUser</a>
										<span class="text-grey">2 hours ago</span>
									</div>
									<div>
										<h2 class="text-lg font-medium mb-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempor placerat turpis eu semper.</h2>
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
							</div>
						</div> */}
                {sub.posts && Object.values(sub.posts).length ?         
                 <div>
                        {/* {Object.values(sub.posts).map(post => (
                            <div>

                            <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>
                                <div className='subPagePostLink'>
                                    {authors && Object.values(authors).length ? 
                                    <p className='subAuthorUsername'>Posted by {authors[post.authorId]?.username} 
                           
                                    </p>
                                    : ''}
                               
                                    <h1 class="mb-5 text-3xl font-bold">{post.header}</h1>
                                    <div>{Object.keys(postImages)}</div>
                                                            <div>{Object.keys(postImages).includes(post.id)}</div>
                                                            <div>{postImages[post.id]?.url}</div>
                                    {postImages && Object.values(postImages).length && postImages[post.id]?.url ? 
                                    <div className='image'>
                                   
                                        
                                        <img src={postImages[post.id]?.url} 
                                                onError={(e) => {
                                                    e.target.onerror = null
                                                    e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                                }} 
                                                alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                        className='postImageSrc-sub'/>
                                        
                                    </div>
                                    : ''}
                                    <div className='subPostBodyParent'>
                                        <p className='subPostBody'>
                                        {post.body}
                                        </p>
           
                                    </div>
                                </div>
                            </NavLink>
                            {user ? post.authorId == user.id || sub.ownerId == user.id ? <OpenModalButton modalComponent={<DeletePostFromSub postId={post.id} subName={subName}/>} buttonText={'Delete'}/> : '' : ''}
                            </div>

                            
       
                        ))} */}

                        {Object.values(sub.posts).map(post => (
                            <div style={{width:'44rem'}}>
                                     <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>

                                                 <div class="py-2">
                                                 <div class="flex border border-grey-light-alt hover:border-grey rounded bg-white cursor-pointer">
                                                     <div class="w-1/12 flex flex-col text-center pt-2">
                                                         <button class="text-xs">
                                                             <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10v8h6v-8h5l-8-8-8 8h5z"/></svg>
                                                         </button>
                                                         <span class="text-xs font-semibold my-1">20k</span>
                                                         <button class="text-xs">
                                                             <svg class="w-5 fill-current text-grey" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M7 10V2h6v8h5l-8 8-8-8h5z"/></svg>
                                                         </button>
                                                     </div>
                                                     <div class="w-11/12 pt-2">
                                                         <div class="flex items-center text-xs mb-2">
                                                             <a href="#" class="font-semibold no-underline hover:underline text-black flex items-center">
                                                                 <img class="rounded-full border h-5 w-5" src="https://avatars0.githubusercontent.com/u/30317862?s=200&v=4"/>
                                                                 <span class="ml-2">{subName}</span>
                                                             </a>
                                                             <span class="text-grey-light mx-1 text-xxs">•</span>
                                                             <span class="text-grey">Posted by</span>
                                                             {/* <a href="#" class="text-grey mx-1 no-underline hover:underline">{authors[post.authorId]?.username}</a> */}
                                                             <span class="text-grey">2 hours ago</span>
                                                         </div>
                                                         <div>
                                                             <h2 class="text-lg font-medium mb-1">{post.header}</h2>
                                                         </div>
                                                         <div className='image'>
                                                            {/* <div>{Object.keys(postImages)}</div>
                                                            <div>{Object.keys(postImages).includes(post.id)}</div>
                                                            <div>{postImages[post.id]?.url}</div> */}
                                                             {Object.keys(postImages).includes(post.id.toString()) ? 
                                                             
                                                             <img src={postImages[post.id]?.url} 
                                                                     onError={(e) => {
                                                                         e.target.onerror = null
                                                                         e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                                                     }} 
                                                                     alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                                             className='postImageSrc-sub'/>
                                                             // {/* :''} */}
                                                             : ''}
                                                             </div>
                                                             {/* <p>Test</p> */}
                                                             {/* <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Frog_on_palm_frond.jpg/1200px-Frog_on_palm_frond.jpg'/> */}
                                                             {/* <img src={postImages[post.id]?.url} 
                                                                     onError={(e) => {
                                                                         e.target.onerror = null
                                                                         e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                                                     }} 
                                                                     alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                                             className='postImageSrc-sub'/> */}
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
                                                 </div>
                                             </div>
                                     </NavLink>
                            </div>
                        ))}
                    </div>
                : ''}
            </div>
        </div>
        </>
    )
}

export default Subcrudit