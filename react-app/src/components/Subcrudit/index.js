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
            <div class="rounded bg-white mb-4">
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
                {sub.posts && Object.values(sub.posts).length ?         
                 <div>
                        {Object.values(sub.posts).map(post => (
                            <div>

                            <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>
                                <div className='subPagePostLink'>
                                    {authors && Object.values(authors).length ? 
                                    <p className='subAuthorUsername'>Posted by {authors[post.authorId]?.username} 
                                    {/* {user ? post.authorId == user.id || sub.ownerId == user.id ? <OpenModalButton modalComponent={<DeletePostFromSub postId={post.id}/>} buttonText={'Delete'}/> : '' : ''} */}
                                    </p>
                                    : ''}
                                    {/* {post.authorId} */}
                                    {/* <h1 className='subPostHeader'>{post.header}</h1> */}
                                    <h1 class="mb-5 text-3xl font-bold">{post.header}</h1>
                                    {postImages && Object.values(postImages).length && postImages[post.id]?.url ? 
                                    <div className='image'>
                                        {/* {Object.keys(postImages).includes(post.id) ?  */}
                                        
                                        <img src={postImages[post.id]?.url} 
                                                onError={(e) => {
                                                    e.target.onerror = null
                                                    e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                                }} 
                                                alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                                        className='postImageSrc-sub'/>
                                        {/* :''} */}
                                    </div>
                                    : ''}
                                    <div className='subPostBodyParent'>
                                        <p className='subPostBody'>
                                        {post.body}
                                        </p>
                                        {/* <button onClick={handleRedirect}>
                                                go back
                                        </button> */}
                                    </div>
                                </div>
                            </NavLink>
                            {user ? post.authorId == user.id || sub.ownerId == user.id ? <OpenModalButton modalComponent={<DeletePostFromSub postId={post.id} subName={subName}/>} buttonText={'Delete'}/> : '' : ''}
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