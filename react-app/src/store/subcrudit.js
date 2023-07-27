import { getAllPosts } from "./post"

const GET_ONE_SUB = 'subs/getOne'
const CREATE_SUB = 'subs/Create'
const EDIT_SUB = 'subs/Edit'
const DELETE_SUB = 'subs/Delete'
const GET_ALL_SUBS = 'subs/getAll'
const GET_ALL_SUBS_REAL = 'subs/getAllReal'
const DELETE_POST_FROM_SUB = 'subs/deletePost'
const FOLLOW_SUB = 'subs/followSub'
const UNFOLLOW_SUB = 'subs/unfollowSub'
const ADD_MOD = 'subs/addMod'

const actionGetAllSubs = (subs) => ({
    type: GET_ALL_SUBS,
    subs
})
const actionGetAllSubsReal = (subs) => ({
    type: GET_ALL_SUBS_REAL,
    subs
})

const actionGetOneSub = (oneSub) => ({
    type: GET_ONE_SUB,
    oneSub
})

const actionCreateSub = (newSub) => ({
    type: CREATE_SUB,
    newSub
})

const actionEditSub = (editedSub) => ({
    type: EDIT_SUB,
    editedSub
})

const actionDeleteSub = (subcruditId) => ({
    type: DELETE_SUB,
    subcruditId
})

const actionDeletePostFromSub = (postId) => ({
    type: DELETE_POST_FROM_SUB,
    postId
})

const actionFollowSub = (user) => ({
    type: FOLLOW_SUB,
    user
})
const actionUnfollowSub = (user) => ({
    type: UNFOLLOW_SUB,
    user
})

const actionAddMod = (user) => ({
    type: ADD_MOD,
    user
})


export const getAllSubs = () => async dispatch => {
    console.log('ALL SUBS THINK HIT')
    const res = await fetch(`/api/subcrudits/all`)

    if (res.ok) {
        console.log('ALL SUBS RES OK')
        const subs = await res.json()
        console.log('subs in res ok', subs)
        dispatch(actionGetAllSubs(subs))
        return subs
    }
}
export const getAllSubsReal = () => async dispatch => {
    console.log('ALL SUBS REAL THINK HIT')
    const res = await fetch(`/api/subcrudits/all/objects`)

    if (res.ok) {
        console.log('ALL SUBS REAL RES OK')
        const subs = await res.json()
        console.log('COMPLETE SUB OBJECTS in res ok', subs)
        dispatch(actionGetAllSubsReal(subs))
        return subs
    }
}


export const getOneSub = (subName) => async dispatch => {
    console.log('GET ONE SUB THUNK HIT')
    const res = await fetch(`/api/subcrudits/${subName}`)

    if (res.ok) {
        console.log('GET ONE SUB RES OK')
        const oneSub = await res.json()
        dispatch(actionGetOneSub(oneSub))
        return oneSub
    }
}

export const createSub = (name, description) => async dispatch => {
    // console.log('CREATE SUB THUNK HIT')
    const res = await fetch(`/api/subcrudits/create`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'name': name,
            'description': description
        })
    })

    if (res.ok) {
        // console.log('CREATE SUB RES OK')
        const newSub = await res.json()
        dispatch(actionCreateSub(newSub))
        return newSub
    }
}

export const editSub = (subName, name, description) => async dispatch => {
    // console.log('EDIT SUB THUNK HIT')
    const res = await fetch(`/api/subcrudits/${subName}/edit`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'name': name,
            'description': description
        })
    })

    if (res.ok) {
        // console.log('EDIT SUB RES OK')
        const editedSub = await res.json()
        console.log('EDITED SUB', editedSub)
        await dispatch(actionEditSub(editedSub))
        return editedSub
    }
}

export const deleteSub = (subName, subcruditId) => async dispatch => {
    // console.log('DELETE SUB THUNK HIT')
    const res = await fetch(`/api/subcrudits/${subName}/delete`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    })

    if (res.ok) {
        // console.log('DELETE SUB RES OK')
        await dispatch(actionDeleteSub(subcruditId))
    }
}

export const deletePostFromSub = (postId) => async dispatch => {
    console.log('DELETE POST FROM SUB THUNK HIT')
    const res = await fetch(`/api/posts/${postId}/delete`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    })

    if (res.ok) {
        console.log('DELETE POST FROM SUB RES OK')
        await dispatch(actionDeletePostFromSub(postId))
        // await dispatch(getAllPosts())
    }
}

export const followSub = (subId, userId) => async dispatch => {
    const res = await fetch(`/api/subcrudits/${subId}/follow`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'userId': userId
        })
    })

    if (res.ok) {
        console.log('FOLLOW SUB RES OK')
        const user = await res.json()
        console.log('USER RES JSON', user)
        dispatch(actionFollowSub(user))
    }
}

export const unfollowSub = (subId, userId) => async dispatch => {
    const res = await fetch(`/api/subcrudits/${subId}/unfollow`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'userId': userId
        })
    })

    if (res.ok) {
        console.log('UNFOLLOW SUB RES OK')
        console.log('USER ID', userId) //correct user ID
        const user = await res.json()
        dispatch(actionUnfollowSub(user))
    }
}

export const addMod = (subId, userId) => async dispatch => {
    console.log('ADD MOD THUNK HIT')
    console.log('userId', userId)
    const res = await fetch(`/api/subcrudits/${subId}/add_mod`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'userId': userId
        })
    })

    if (res.ok) {
        console.log('ADD MOD RES OK')
        const user = await res.json()
        console.log('USER RES JSON', user)
        dispatch(actionAddMod(user))
    }
}


const initialState = {
    allSubcrudits: {},
    allSubsReal: {},
    oneSubcrudit: {},
    newSubcrudit: {},
    editedSubcrudit: {},
    users: {}
}
export default function subcruditReducer(state=initialState, action) {
    switch (action.type) {
        case GET_ALL_SUBS_REAL: {
            console.log('ALL SUBS REAL REDUCER HIT')
            const newState6 = {...state, allSubsReal: {...state.allSubsReal}, oneSubcrudit: {...state.oneSubcrudit}}
            newState6.allSubsReal = {...action.subs}
            return newState6
        }
        case GET_ALL_SUBS: {
            // console.log('ALL SUBS REDUCER HIT')
            const newState5 = {...state, allSubcrudits: [], oneSubcrudit: {...state.oneSubcrudit}}
            //allSubcrudits only contains the names of the subs and is an array. it must be kept as an array for the options list
            newState5.allSubcrudits = [...action.subs]

            // action.subs.map(sub => newState5.allSubcrudits[sub.id] = {...sub})

            return newState5

        }
        case GET_ONE_SUB: {
            console.log('GET ONE SUB REDUCER HIT')
            // const newState = {...state, oneSubcrudit: {...state.oneSubcrudit}, users: {...state.users}}
            const newState = {...state, oneSubcrudit: {...state.oneSubcrudit}}
            
            // state.oneSubcrudit.users = {...state.users} //if commenting in line 228, comment this out

            //allSubcrudits only contains the names of the subs and is an array. it must be kept as an array for the options list.
            //if it isn't, the options list breaks when visiting a single sub straight from the homepage, and search becomes useless
            //as a result
            newState.oneSubcrudit = {...action.oneSub}
            newState.oneSubcrudit.posts = {}
            newState.oneSubcrudit.mods = {}
            const users = [...newState.oneSubcrudit.users]
            newState.oneSubcrudit.users = {}
            users.map(user => newState.oneSubcrudit.users[user.id] = user)
            console.log('ONE SUB USERS',newState.oneSubcrudit.users)
            console.log('GET ONE SUB STATE allSubcrudits', state.allSubcrudits)
            // newState.allSubcrudits = [...state.allSubcrudits]

            action.oneSub.posts.map(post => newState.oneSubcrudit.posts[post.id] = {...post})
            action.oneSub.mods.map(mod => newState.oneSubcrudit.mods[mod.id] = {...mod})

            return newState
        }
        case CREATE_SUB: {
            // console.log('CREATE SUB REDUCER HIT')
            const newState2 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}, newSubcrudit: {...state.newSubcrudit}}

            newState2.newSubcrudit = {...action.newSub}

            return newState2
        }
        case EDIT_SUB: {
            console.log('EDIT SUB REDUCER HIT')
            console.log('ACTION EDITED SUB', action.editedSub)
            const newState3 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}, newSubcrudit: {...state.newSubcrudit}, editedSubcrudit: {...state.editedSubcrudit}}

            newState3.editedSubcrudit = {...action.editedSub}

            return newState3
        }
        case DELETE_SUB: {
            console.log('DELETE SUB REDUCER HIT')
            const newState4 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}, allSubsReal: {...state.allSubsReal}}
            
            delete newState4.allSubcrudits[action.subcruditId]
            delete newState4.allSubsReal[action.subcruditId]
            
            // delete newState4.oneSubcrudit[action.subcruditId]
            delete newState4.oneSubcrudit[action.subcruditId]
            
            return newState4
        }
        case DELETE_POST_FROM_SUB: {
            console.log('DELETE POST FROM SUB REDUCER HIT')
            const newState5 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}}

            delete newState5.oneSubcrudit.posts[action.postId]

            return newState5
        }
        case ADD_MOD: {
            console.log('ADD MOD REDUCER HIT')
            console.log('action user', action.user)
            const newState6 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}}

            // Object.values(newState6.oneSubcrudit).append(action.user)
            newState6.oneSubcrudit[action.user.id] = {...action.user}

            return newState6
        }
        case FOLLOW_SUB: {
            console.log('FOLLOW SUB REDUCER HIT')
            console.log('action user', action.user)
            const newState7 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}} //need to normalize single sub users?

            // Object.values(newState6.oneSubcrudit).append(action.user)
            // newState7.oneSubcrudit[action.user.id] = {...action.user}
            action.user.users.map(user => console.log('FOLLOW SUB USER MAP', user))
            action.user.users.map(user => newState7.oneSubcrudit.users[user.id] = {...user})
            // action.user.users.map(user => newState7.oneSubcrudit.users[user.id] = user)
            // newState7.oneSubcrudit.users = action.user.users
            // newState7.oneSubcrudit.users = {}
            // newState7.oneSubcrudit.users[action.user.id] = {...action.user}
            console.log('NEW STATE 7', newState7)

            return newState7
        }
        case UNFOLLOW_SUB: {
            console.log('UNFOLLOW SUB REDUCER HIT')
            console.log('action user', action.user.id) //id is incorrect for some reason
            const newState8 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}} //need to normalize single sub users?

            console.log('NEW STATE 8 BEFORE DELETE', newState8)
            console.log('STATE ONE SUB', newState8.oneSubcrudit.users)
            delete newState8.oneSubcrudit.users[action.user.id]
            console.log('NEW STATE 8 AFTER DELETE', newState8)
            return newState8
        }
        default:
            return state
    } 
}