const GET_ALL_POSTS = 'posts/getAll'
const GET_ONE_POST = 'posts/getOne'
const GET_AUTHOR = 'posts/getAuthor'
const CREATE_POST = 'posts/Create'
const EDIT_POST = 'posts/Edit'
const DELETE_POST = 'posts/Delete'

const MAKE_COMMENT = 'comments/Make'
const DELETE_COMMENT = 'comments/Delete'
const GET_COMMENT = 'comment/Get'
const EDIT_COMMENT = 'comment/Edit'

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

const actionDeleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
})

const actionGetOneComment = (comment) => ({
    type: GET_COMMENT,
    comment
})

const actionEditComment = (editedComment) => ({
    type: EDIT_COMMENT,
    editedComment
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

export const deleteComment = (commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}  
    })

    if (res.ok) {
        dispatch(actionDeleteComment(commentId))
    }
}

export const editComment = (commentId, text) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'text': text
        }) 
    })

    if (res.ok) {
        let commentToEdit = await res.json()
        console.log('')
        console.log('')
        console.log('COMMENT TO EDIT', commentToEdit)
        console.log('')
        console.log('')
        dispatch(actionEditComment(commentToEdit))
    }
}

export const getOneComment = (commentId) => async dispatch => {
    const res = await fetch(`/api/comments/${commentId}`)

    if (res.ok) {
        let comment = await res.json()
        console.log('')
        console.log('')
        console.log('ONE COMMENT', comment)
        console.log('')
        console.log('')
        dispatch(actionGetOneComment(comment))
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
    newPost: {},
    singleComment: {}
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
            console.log('action single post', action.singlePost)

            newState2.singlePost.comments = {}

            action.singlePost.comments?.map(comment => (newState2.singlePost.comments[comment.id] = comment))

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
            console.log('state single post make comment', newState7.singlePost)
            // newState7.singlePost = {...action.newComment} only the comment
            newState7.singlePost.comments[action.newComment.id] = {...action.newComment}
            console.log('state single post make comment after action reassignment', newState7.singlePost)
            return newState7
        }
        case DELETE_COMMENT: {
            const newState8 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}

            delete newState8.singlePost.comments[action.commentId]

            return newState8
        }
        case GET_COMMENT: {
            const newState9 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}, singleComment: {...state.singleComment}}

            console.log('NEW STATE 9')
            console.log('action single comment', action.comment)

            newState9.singleComment = {...action.comment}

            return newState9
        }
        case EDIT_COMMENT: {
            const newState10 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}, singleComment: {...state.singleComment}}
            
            newState10.editedComment = {...action.editedComment}
            newState10.singlePost.comments[action.editedComment.id] = {...action.editedComment}

            return newState10
        }
        default:
            return state
    }
}