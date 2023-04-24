const GET_ONE_SUB = 'subs/getOne'
const CREATE_SUB = 'subs/Create'
const EDIT_SUB = 'subs/Edit'
const DELETE_SUB = 'subs/Delete'
const GET_ALL_SUBS = 'subs/getAll'

const actionGetAllSubs = (subs) => ({
    type: GET_ALL_SUBS,
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
        dispatch(actionEditSub(editedSub))
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


const initialState = {
    allSubcrudits: {},
    oneSubcrudit: {},
    newSubcrudit: {},
    editedSubcrudit: {}
}
export default function subcruditReducer(state=initialState, action) {
    switch (action.type) {
        case GET_ALL_SUBS: {
            console.log('ALL SUBS REDUCER HIT')
            const newState5 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}}

            newState5.allSubcrudits = [...action.subs]

            // action.subs.map(sub => newState5.allSubcrudits[sub.id] = {...sub})

            return newState5

        }
        case GET_ONE_SUB: {
            console.log('GET ONE SUB REDUCER HIT')
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