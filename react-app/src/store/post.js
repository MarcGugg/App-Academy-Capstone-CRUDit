import {merge} from 'lodash'

const GET_ALL_POSTS = 'posts/getAll'
const GET_ONE_POST = 'posts/getOne'
const GET_AUTHOR = 'posts/getAuthor'
const CREATE_POST = 'posts/Create'
const EDIT_POST = 'posts/Edit'
const DELETE_POST = 'posts/Delete'

const UPVOTE_POST = 'posts/Upvote'
const DOWNVOTE_POST = 'posts/Downvote'
const REMOVE_UPVOTE = 'posts/removeUpvote'
const REMOVE_DOWNVOTE = 'posts/removeDownvote'

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

const actionUpvotePost = (currUser, upvotedPost) => ({
    type: UPVOTE_POST,
    currUser,
    upvotedPost
})

const actionDownvotePost = (currUser, downvotedPost) => ({
    type: DOWNVOTE_POST,
    currUser,
    downvotedPost
})

const actionRemoveUpvote = (currUser, post) => ({
    type: REMOVE_UPVOTE,
    currUser,
    post
})
const actionRemoveDownvote = (currUser, post) => ({
    type: REMOVE_DOWNVOTE,
    currUser,
    post
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

export const upvotePost = (postId) => async dispatch => {
    console.log('UPVOTE POST THUNK HIT')
    const res = await fetch(`/api/posts/${postId}/upvote`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'postId': postId
        })
    })

    if (res.ok) {
        console.log('UPVOTE POST RES OK')
        const result = await res.json()
        console.log('UPVOTE POST RESULT', result)
        let currUser = result[0]
        let upvotedPost = result[1]
        dispatch(actionUpvotePost(currUser, upvotedPost))
    }
}

export const downvotePost = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/downvote`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'postId': postId
        })
    })

    if (res.ok) {
        const result = await res.json()
        let currUser = result[0]
        let downvotedPost = result[1]
        dispatch(actionDownvotePost(currUser, downvotedPost))
    }
}

export const removeUpvote = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/remove_upvote`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'postId': postId
        })
    })

    if (res.ok) {
        const result = await res.json()
        let currUser = result[0]
        let post = result[1]
        dispatch(actionRemoveUpvote(currUser, post))
    }
}

export const removeDownvote = (postId) => async dispatch => {
    const res = await fetch(`/api/posts/${postId}/remove_downvote`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'postId': postId
        })
    })

    if (res.ok) {
        const result = await res.json()
        let currUser = result[0]
        let post = result[1]
        dispatch(actionRemoveDownvote(currUser, post))
    }
}

let initialState = {
    allPosts: {},
    singlePost: {},
    newPost: {},
    singleComment: {},
    upvotedPost: {}
}
export default function postReducer(state=initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS: {
            // console.log('REDUCER')
            const newState = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}
            console.log('ALL POSTS', newState.allPosts)
            // const upvotes = {}
            // const downvotes = {}

            // for (let post of Object.values(newState.allPosts)) {
            //     // post.upvotes = {}
            //     // post.downvotes = {}

            //     const upvotes = {}
            //     const downvotes = {}
            //     console.log(post.upvotes)
            //     for (let i = 0; i < post.upvotes.length; i++) {
            //         // debugger
            //         let user = post.upvotes[i]
            //         upvotes[user.id] = {...user}
            //     }
            //     for (let i = 0; i < post.downvotes.length; i++) {
            //         let user = post.downvotes[i]
            //         downvotes[user.id] = {...user}
            //     }
            //     console.log('upvotes', upvotes, 'downvotes', downvotes)

            //     newState.allPosts[post.id].upvotes = {}
            //     newState.allPosts[post.id].upvotes = {...upvotes}
                
            //     newState.allPosts[post.id].downvotes = {}
            //     newState.allPosts[post.id].downvotes = {...downvotes}

            //     console.log('all posts after normalization',newState.allPosts[post.id])
            // }
            // console.log('first post', newState.allPosts[1])
            // console.log('all posts reghureluoh', newState.allPosts)
            
            // console.log('ALL POSTS 2', Object.values(newState.allPosts)[0])
            // console.log('STATE ALL POSTS', Object.values(state.allPosts)[0])
            
            // // for (let post of Object.values(state.allPosts)) {
            // //     let newStatePost = {...newState.allPosts[post.id]}
            // //     // let newStatePost = newState.allPosts[post.id]
            // //     console.log('post upvotes', post.upvotes)
            // //     Object.values(post.upvotes).map(user => newState.allPosts[post.id].upvotes[user.id] = {...user})
            // //     // Object.values(post.downvotes).map(user => newStatePost.downvotes[user.id] = {...user})
            // //     // console.log('newStatePost upvotes', newStatePost.upvotes)
            // //     console.log(newState.allPosts)
            // // }
            // // for (let post of Object.values(state.allPosts)) {
            // //     console.log('POST', post)
            // //     console.log('POST UPVOTES', post.upvotes)
            // //     for (const user of Object.values(post.upvotes)) {
            // //         console.log('POST UPVOTES', post.upvotes)
            // //         const postId = post.id;
            // //         newState.allPosts[postId].upvotes[user.id] = { ...user };
            // //     }
            // // }
        

            // console.log('newState allPosts', newState.allPosts)
            // console.log('OG STATE ALL POSTS',state.allPosts)
            // newState.allPosts = {...state.allPosts}
            // console.log('IURWGORWAUB',newState.allPosts)
            action.allPosts.map(post => newState.allPosts[post.id] = {...post}) //DO NOT COMMENT THIS OUT OR HOME PAGE WILL BREAK
            // Object.values(state.allPosts).map(post => newState.allPosts[post.id] = {...post}) //DO NOT COMMENT THIS OUT OR UPVOTES AND DOWNVOTES WILL NOT BE NORMALIZED
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
        case UPVOTE_POST: {
            console.log('ACTION', action)
            const newState11 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}, upvotedPost: {...state.upvotedPost}}
            // const newState11 = merge({}, state) //deep copies state
            // debugger
            // newState11.allPosts[action.upvotedPost.id].downvotes = {}
            // Object.values(state.allPosts[action.upvotedPost.id].downvotes).map(user => newState11.allPosts[action.upvotedPost.id].downvotes[user.id] = {...user}) //normalize downvotes

            // if (Object.keys(newState11.allPosts[action.upvotedPost.id].downvotes).includes(action.currUser.id.toString())) { //if user has downvoted the post, remove user from post downvotes
            //     delete newState11.allPosts[action.upvotedPost.id].downvotes[action.currUser.id]
            // }
            
            // // newState11.allPosts[action.upvotedPost.id].upvotes = {}
            // Object.values(state.allPosts[action.upvotedPost.id].upvotes).map(user => newState11.allPosts[action.upvotedPost.id].upvotes[user.id] = {...user}) ///normalize upvotes 
            // newState11.allPosts[action.upvotedPost.id].upvotes[action.currUser.id] = {...action.currUser}
            newState11.allPosts[action.upvotedPost.id] = {...action.upvotedPost}
            // debugger
            console.log('newState11', newState11)
            return newState11
        }
        case DOWNVOTE_POST: {
            console.log('ACTION', action)
            const newState12 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}, upvotedPost: {...state.upvotedPost}}
            // // const newState12 = merge({}, state) //deep copies state
            
            // // newState12.allPosts[action.downvotedPost.id].upvotes = {}
            // Object.values(state.allPosts[action.downvotedPost.id].upvotes).map(user => newState12.allPosts[action.downvotedPost.id].upvotes[user.id] = {...user}) ///normalize upvotes

            // if (Object.keys(newState12.allPosts[action.downvotedPost.id].upvotes).includes(action.currUser.id.toString())) { //if user has upvoted the post, remove user from post upvotes
            //     console.log('DOWNVOTE IF STATEMENT')
            //     delete newState12.allPosts[action.downvotedPost.id].upvotes[action.currUser.id]
            // }

            // // newState12.allPosts[action.downvotedPost.id].downvotes = {}
            // Object.values(state.allPosts[action.downvotedPost.id].downvotes).map(user => newState12.allPosts[action.downvotedPost.id].downvotes[user.id] = {...user}) ///normalize downvotes
            // newState12.allPosts[action.downvotedPost.id].downvotes[action.currUser.id] = {...action.currUser}
            newState12.allPosts[action.downvotedPost.id] = {...action.downvotedPost}
            
            return newState12
        }
        case REMOVE_UPVOTE: {
            console.log('remove upvote action', action.post)
            const newState13 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}, upvotedPost: {...state.upvotedPost}}

            newState13.allPosts[action.post.id] = {...action.post}

            return newState13
        }
        case REMOVE_DOWNVOTE: {
            console.log('remove upvote action', action.post)
            const newState14 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}, upvotedPost: {...state.upvotedPost}}

            newState14.allPosts[action.post.id] = {...action.post}

            return newState14
        }
        default:
            return state
    }
}