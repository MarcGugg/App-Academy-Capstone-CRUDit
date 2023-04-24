import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useHistory, useParams } from 'react-router-dom'
import { deleteSub, getOneSub } from '../../store/subcrudit'
import { getAuthors } from '../../store/post'
import { getPostImages } from '../../store/post_image'

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
        await dispatch(deleteSub(subName, sub.id))
        history.push('/')
    }

    if (!sub || !Object.values(sub).length ) {
        return null
    }

    // || !sub || !authors
    //  || !Object.values(authors).length

    // if (postImages && !Object.values(postImages).length) {
    //     return null
    // }


    return (
        <>
        <div className='wholeSub'>
            <div className='infoAndButtonBoxParent'>
                <div className='infoAndButtonBox'>
                {/* <h1>Subcrudit page</h1> */}
                <div className='subNameAndDesc'>
                    <h1 className='subName' >{sub.name}</h1>
                    <p>{sub.description}</p>
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
                            <NavLink to={`/posts/${post.id}`} style={{ textDecoration: 'none'}}>
                                <div className='subPagePostLink'>
                                    {authors && Object.values(authors).length ? 
                                    <p className='subAuthorUsername'>Posted by {authors[post.authorId]?.username} </p>
                                    : ''}
                                    {/* {post.authorId} */}
                                    <h1 className='subPostHeader'>{post.header}</h1>
                                    {postImages && Object.values(postImages).length && postImages[post.id]?.url ? 
                                    <div className='image'>
                                        {/* {Object.keys(postImages).includes(post.id) ?  */}
                                        
                                        <img src={postImages[post.id]?.url} className='postImageSrc-sub'/>
                                        {/* :''} */}
                                    </div>
                                    : ''}
                                    <div className='subPostBody'>
                                        {post.body}
                                    </div>
                                </div>
                            </NavLink>
                        ))}
                    </div>
                : ''}
            </div>
        </div>
        </>
    )
}

export default Subcrudit