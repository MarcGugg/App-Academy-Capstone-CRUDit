const GET_ALL_POSTS = 'posts/getAll'
const GET_ONE_POST = 'posts/getOne'
const GET_AUTHOR = 'posts/getAuthor'
const CREATE_POST = 'posts/Create'
const EDIT_POST = 'posts/Edit'
const DELETE_POST = 'posts/Delete'

const MAKE_COMMENT = 'comments/Make'

//posts
const actionGetAllPosts =(allPosts) => ({
    type: GET_ALL_POSTS,
    allPosts
})

const actionGetOnePost = (singlePost) => ({
    type: GET_ONE_POST,
    singlePost
})

const actionGetAuthors = (authors) => ({
    type: GET_AUTHOR,
    authors
})

const actionCreatePost = (newPost) => ({
    type: CREATE_POST,
    newPost
})

const actionEditPost = (editedPost) => ({
    type: EDIT_POST,
    editedPost
})

const actionDeletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

//comments actions
const actionMakeComment = (newComment) => ({
    type: MAKE_COMMENT,
    newComment
})

//comments thunks
export const makeComment = (postId, text) => async dispatch => {
    const res = await fetch(`/api/comments/from_post/${postId}`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'post_id': postId,
            'text': text
        })
    })

    if (res.ok) {
        let newComment = await res.json()
        dispatch(actionMakeComment(newComment))
    }
}

//posts

export const deletePost = (postId) => async dispatch => {
    console.log('DELETE POST THUNK HIT')
    const res = await fetch(`/api/posts/${postId}/delete`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    })

    if (res.ok) {
        console.log('DELETE POST RES OK')
        await dispatch(actionDeletePost(postId))
    }
}



export const getAllPosts = () => async dispatch => {
    const res = await fetch('/api/posts/all')

    if (res.ok) {
        // console.log('RES OK')
        const allPosts = await res.json()
        // console.log('allPosts', allPosts)
        dispatch(actionGetAllPosts(allPosts))
    }
}

export const getOnePost = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}`)

    if (res.ok) {
        const singlePost = await res.json()
        dispatch(actionGetOnePost(singlePost))
    }
}

export const getAuthors = (authorIdArr) => async dispatch => {
    // console.log('AUTHOR THUNK HIT', authorIdArr)
    let resArr = []
    for (let i = 0; i < authorIdArr.length; i++) {
        const res = await fetch(`/api/posts/authors/${authorIdArr[i]}`)
        if (res.ok) {
            resArr.push(res)
        }
    }

    if (resArr.length) {
        let authors = []
        // console.log('AUTHOR RES OK')
        for (let author of resArr) {
            const authorJson = await author.json()
            authors.push(authorJson)
        }
        // console.log('RES ARR JSON', authors)
        dispatch(actionGetAuthors(authors))
    }
}

export const addImageToPost = (newPost, image) => async dispatch => {
    // console.log('ASSOCIATE IMAGE THUNK HIT')
    const res = await fetch(`/api/post_images/${newPost.id}/add_image`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'url': image
        })
    })

    if (res.ok) {
        // console.log('POST IMAGE RES OK')
        const newImage = await res.json()
        // console.log('NEW IMAGE', newImage)
        return newImage
    }
} 

export const createPost = (subcrudditId, header, body, image) => async dispatch => {
    // console.log('NEW POST THUNK HIT')
    let res;
    if (image) {
        // console.log('IN IMAGE CONDITIONAL')
        res = await fetch(`/api/posts/${subcrudditId}/new_post`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                'header': header,
                'body': body
            })
        })

        if (res.ok) {
            const newPost = await res.json()
            // console.log('NEW POST', newPost)
            // const newPostWithImage= await dispatch(addImageToPost(newPost, image))
            await dispatch(addImageToPost(newPost, image))
            // console.log('NEW POST WITH IMAGE', newPostWithImage)
            dispatch(actionCreatePost(newPost))
            return newPost
        }
    } else {
        // console.log('IN ELSE STATEMENT')
        res = await fetch(`/api/posts/${subcrudditId}/new_post`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                'header': header,
                'body': body
            })
        })
        
        if (res.ok) {
            const newPost = await res.json()
            dispatch(actionCreatePost(newPost))
            return newPost
        }
    }

}




export const editPost = (postId, header, body) => async dispatch => {
    // console.log('EDIT POST THUNK HIT')
    // console.log('post id', postId)
    const res = await fetch(`/api/posts/${postId}/edit`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'header': header,
            'body': body
        })
    })
    
    if (res.ok) {
        // console.log('EDIT POST RES OK')
        const editedPost = await res.json()
        dispatch(actionEditPost(editedPost))
    }
}


let initialState = {
    allPosts: {},
    singlePost: {},
    newPost: {}
}
export default function postReducer(state=initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS: {
            // console.log('REDUCER')
            const newState = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}
            action.allPosts.map(post => newState.allPosts[post.id] = {...post})
            return newState
        }
        case GET_ONE_POST: {
            const newState2 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}

            newState2.singlePost = {...action.singlePost}

            return newState2
        }
        case GET_AUTHOR: {
            const newState3 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}

           newState3.authors = {}

           Object.values(action.authors).map(author => newState3.authors[author.id] = {...author})

            return newState3
        }
        case CREATE_POST: {
            const newState4 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}, newPost: {...state.newPost}}
        
            newState4.newPost = {...action.newPost}

            return newState4
        }
        case EDIT_POST: {
            // console.log('EDIT POST REDUCER HIT')
            const newState5 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}

            newState5.editedPost = {...action.editedPost}

            return newState5
        }
        case DELETE_POST: {
            console.log('DELETE POST THUNK HIT')
            const newState6 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}

            delete newState6.allPosts[action.postId]
            console.log('new state 6', newState6)
            return newState6
        }
        //COMMENT STARTS HERE
        case MAKE_COMMENT: {
            const newState7 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}
            return newState7
        }
        default:
            return state
    }
}