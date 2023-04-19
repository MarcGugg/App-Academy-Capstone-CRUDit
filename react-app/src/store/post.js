const GET_ALL_POSTS = 'posts/getAll'

const actionGetAllPosts =(allPosts) => ({
    type: GET_ALL_POSTS,
    allPosts
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
        default:
            return state
    }
}