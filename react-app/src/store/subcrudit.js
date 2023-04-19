const GET_ONE_SUB = 'subs/getOne'


const actionGetOneSub = (oneSub) => ({
    type: GET_ONE_SUB,
    oneSub
})



export const getOneSub = (subcruditId) => async dispatch => {
    const res = await fetch(`/api/subcrudits/${subcruditId}`)

    if (res.ok) {
        const oneSub = await res.json()
        dispatch(actionGetOneSub(oneSub))
    }
}






const initialState = {
    allSubcrudits: {},
    oneSubcrudit: {}
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
        default:
            return state
    } 
}