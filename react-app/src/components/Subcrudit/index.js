import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { NavLink, useParams } from 'react-router-dom'
import { getOneSub } from '../../store/subcrudit'
import { getAuthors } from '../../store/post'

function Subcrudit() {

    const dispatch = useDispatch()
    const {subcruditId} = useParams()

    useEffect(async () => {
        await dispatch(getOneSub(subcruditId))
    }, [])

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
        }
    }, [sub])

    const authors = useSelector((state) => state.posts.authors)
    console.log('authors from state', authors)

    console.log('sub', sub)
    console.log('posts', sub.posts)

    const authorIdArr = []
    for (let key in sub.posts) {
        authorIdArr.push(sub.posts[key].authorId)
    }

    // let authors = []

    // console.log('AUTHOR IDS', authorIdArr)
    // console.log('AUTHORS', authors)

    if (!Object.values(sub).length) {
        return null
    }


    return (
        <>
        <h1>Subcrudit page</h1>
        <div>
            <h1>{sub.name}</h1>
            <h2>{sub.description}</h2>
        </div>
        <div>{Object.values(sub.posts).map(post => (
                        <NavLink to={`/posts/${post.id}`}>
                        <div>
                            <p>{authors[post.authorId].username} </p>
                            <h1>{post.header}</h1>
                            <div>
                                {/* {Object.keys(post).includes('image') ? 
                                    <img src={post.image.url} style={{height:50}} />
                                : ''} */}
                            </div>
                            <div>
                                {post.body}
                            </div>
                        </div>
                        </NavLink>
        ))}</div>
        </>
    )
}

export default Subcrudit