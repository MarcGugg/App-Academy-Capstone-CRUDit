import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink } from 'react-router-dom'

import { getAllPosts } from '../../store/post'

function HomePage() {

    const dispatch = useDispatch()

    useEffect(async () => {
        await dispatch(getAllPosts())
    }, [])

    const posts = useSelector((state) => state.posts.allPosts)

    console.log('posts', posts)

    if (!Object.values(posts).length) {
        return null
    }

    return (
        <>
        <h1>Home Page</h1>
        <div>
        {Object.values(posts).map(post => (
            <NavLink to={`/posts/${post.id}`}>
            <div>
                <p>{post.author.username} to {post.subcrudit.name}</p>
                <h1>{post.header}</h1>
                <div>
                    {Object.keys(post).includes('image') ? 
                        <img src={post.image.url} style={{height:50}} />
                    : ''}
                </div>
                <div>
                    {post.body}
                </div>
            </div>
            </NavLink>
        ))}
        </div>
        </>
    )
}

export default HomePage