import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams } from 'react-router-dom'
import { getOnePost } from '../../store/post'

function OnePost() {

    const dispatch = useDispatch()
    const {postId} = useParams()

    useEffect(async () => {
        await dispatch(getOnePost(postId))
    }, [])

    const post = useSelector((state) => state.posts.singlePost)

    console.log('one post', post)

    if (!Object.values(post).length) {
        return null
    }
    

    return (
        <>
        <h1>Single Post</h1>
        <div>
            <div>{post.author.username}</div>
            <h1>{post.header}</h1>
            {Object.keys(post).includes('image') ? <div>
                <img src={post.image.url}/>
            </div>  : ''}
            <p>{post.body}</p>
        </div>
        </>
    )
}

export default OnePost