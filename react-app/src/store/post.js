const GET_ALL_POSTS = 'posts/getAll'
const GET_ONE_POST = 'posts/getOne'



const actionGetAllPosts =(allPosts) => ({
    type: GET_ALL_POSTS,
    allPosts
})

const actionGetOnePost = (singlePost) => ({
    type: GET_ONE_POST,
    singlePost
})

export const getAllPosts = () => async dispatch => {
    const res = await fetch('/api/posts/all')

    if (res.ok) {
        console.log('RES OK')
        const allPosts = await res.json()
        console.log('allPosts', allPosts)
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

let initialState = {
    allPosts: {},
    singlePost: {}
}
export default function postReducer(state=initialState, action) {
    switch (action.type) {
        case GET_ALL_POSTS: {
            console.log('REDUCER')
            const newState = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}
            action.allPosts.map(post => newState.allPosts[post.id] = {...post})
            return newState
        }
        case GET_ONE_POST: {
            const newState2 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}

            newState2.singlePost = {...action.singlePost}

            return newState2
        }
        default:
            return state
    }
}