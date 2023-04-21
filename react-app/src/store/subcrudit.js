const GET_ONE_SUB = 'subs/getOne'
const CREATE_SUB = 'subs/Create'
const EDIT_SUB = 'subs/Edit'
const DELETE_SUB = 'subs/Delete'

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

export const getOneSub = (subcruditId) => async dispatch => {
    const res = await fetch(`/api/subcrudits/${subcruditId}`)

    if (res.ok) {
        const oneSub = await res.json()
        dispatch(actionGetOneSub(oneSub))
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

export const editSub = (subcruditId, name, description) => async dispatch => {
    // console.log('EDIT SUB THUNK HIT')
    const res = await fetch(`/api/subcrudits/${subcruditId}/edit`, {
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
        dispatch(actionEditSub(editedSub))
    }
}

export const deleteSub = (subcruditId) => async dispatch => {
    // console.log('DELETE SUB THUNK HIT')
    const res = await fetch(`/api/subcrudits/${subcruditId}/delete`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
    })

    if (res.ok) {
        // console.log('DELETE SUB RES OK')
        await dispatch(actionDeleteSub(subcruditId))
    }
}


const initialState = {
    allSubcrudits: {},
    oneSubcrudit: {},
    newSubcrudit: {},
    editedSubcrudit: {}
}
export default function subcruditReducer(state=initialState, action) {
    switch (action.type) {
        case GET_ONE_SUB: {
            const newState = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}}

            newState.oneSubcrudit = {...action.oneSub}
            newState.oneSubcrudit.posts = {}
            newState.oneSubcrudit.mods = {}

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
            // console.log('EDIT SUB REDUCER HIT')
            const newState3 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}, newSubcrudit: {...state.newSubcrudit}, editedSubcrudit: {...state.editedSubcrudit}}

            newState3.editedSubcrudit = {...action.editedSub}

            return newState3
        }
        case DELETE_SUB: {
            // console.log('DELETE SUB REDUCER HIT')
            const newState4 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}}
            
            delete newState4.allSubcrudits[action.subcruditId]
            
            delete newState4.oneSubcrudit[action.subcruditId]
            
            return newState4
        }
        default:
            return state
    } 
}