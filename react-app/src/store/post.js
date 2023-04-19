const GET_ALL_POSTS = 'posts/getAll'
const GET_ONE_POST = 'posts/getOne'
const GET_AUTHOR = 'posts/getAuthor'


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

export const getAuthors = (authorIdArr) => async dispatch => {
    console.log('AUTHOR THUNK HIT', authorIdArr)
    let resArr = []
    for (let i = 0; i < authorIdArr.length; i++) {
        const res = await fetch(`/api/posts/authors/${authorIdArr[i]}`)
        if (res.ok) {
            resArr.push(res)
        }
    }

    if (resArr.length) {
        let authors = []
        console.log('AUTHOR RES OK')
        for (let author of resArr) {
            const authorJson = await author.json()
            authors.push(authorJson)
        }
        console.log('RES ARR JSON', authors)
        dispatch(actionGetAuthors(authors))
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
        case GET_AUTHOR: {
            const newState3 = {...state, allPosts: {...state.allPosts}, singlePost: {...state.singlePost}}

           newState3.authors = {}

           Object.values(action.authors).map(author => newState3.authors[author.id] = {...author})

            return newState3
        }
        default:
            return state
    }
}