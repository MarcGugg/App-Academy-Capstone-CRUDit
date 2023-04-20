const GET_ONE_SUB = 'subs/getOne'
const CREATE_SUB = 'subs/Create'

const actionGetOneSub = (oneSub) => ({
    type: GET_ONE_SUB,
    oneSub
})

const actionCreateSub = (newSub) => ({
    type: CREATE_SUB,
    newSub
})


export const getOneSub = (subcruditId) => async dispatch => {
    const res = await fetch(`/api/subcrudits/${subcruditId}`)

    if (res.ok) {
        const oneSub = await res.json()
        dispatch(actionGetOneSub(oneSub))
    }
}

export const createSub = (name, description) => async dispatch => {
    console.log('CREATE SUB THUNK HIT')
    const res = await fetch(`/api/subcrudits/create`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            'name': name,
            'description': description
        })
    })

    if (res.ok) {
        console.log('CREATE SUB RES OK')
        const newSub = await res.json()
        dispatch(actionCreateSub(newSub))
        return newSub
    }
}




const initialState = {
    allSubcrudits: {},
    oneSubcrudit: {},
    newSubcrudit: {}
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
            console.log('CREATE SUB REDUCER HIT')
            const newState2 = {...state, allSubcrudits: {...state.allSubcrudits}, oneSubcrudit: {...state.oneSubcrudit}, newSubcrudit: {...state.newSubcrudit}}

            newState2.newSubcrudit = {...action.newSub}

            return newState2
        }
        default:
            return state
    } 
}