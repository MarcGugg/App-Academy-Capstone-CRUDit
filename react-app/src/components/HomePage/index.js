import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { getAllPosts } from '../../store/post'

import './HomePage.css'
import { getAllSubsReal } from '../../store/subcrudit'

function HomePage() {

    const dispatch = useDispatch()

    
    const user = useSelector((state) => state.session.user)
    const posts = useSelector((state) => state.posts.allPosts)
    
    useEffect(async () => {
        await dispatch(getAllPosts())
        await dispatch(getAllSubsReal())
        await dispatch(getAllPosts())
    }, [dispatch])
    // console.log('posts', posts)

    if (!Object.values(posts).length) {
        return null
    }

    return (
        <>
        <div className='wholePage'>
        <div className='headerAndCreateButtonParent'>
            <div className='headerAndCreateButton'>
            <h1 className='homePageText'>Home Page</h1>
            {user ? 
                <div className='createSubButtonDiv'>
                    <button className='createSubButton'>
                        <NavLink to={'/subcrudits/create/new'} style={{textDecoration:'none'}}>
                            Create A New SubCRUDit

                        </NavLink>
                    </button>
                </div>
            : ''}
            </div>
        </div>
        <div className='homePagePostParent'>
        {Object.values(posts).map(post => (
            <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>
            <div className='homePagePostLink'>
                <p className='author-subcrudit'>
                    <p className='subcruditName'>
                        <NavLink to={`/subcrudits/${post.subcrudit.name}`} 
                        style={{textDecoration:'none', color:'black'}}>
                            {post.subcrudit.name}</NavLink>
                        </p>
                    <p className='authorUsername'>Posted by {post.author.username}</p>
                </p>
                <h1 className='postHeader'>{post.header}</h1>
                {Object.keys(post).includes('image') ? 
                    <div className='postImage'>
                        <img src={post.image.url}
                            onError={(e) => {
                                e.target.onerror = null
                                e.target.src = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                            }} 
                            alt = "https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled.png"
                        className='postImageSrc'
                        />
                    </div>
                : ''}
                <div className='postBodyParent'>
                    <p className='postBody'>
                    {post.body}
                    </p>
                </div>
            </div>
            </NavLink>
        ))}
        </div>
        </div>
        </>
    )
}

export default HomePage