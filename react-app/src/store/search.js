const SUB_SEARCH = 'subs/Search'

const actionSearchSubs = (subs) => ({
    type: SUB_SEARCH,
    subs
})


export const searchSubs = (params) => async dispatch => {
    const res = await fetch(`/api/search/${params}`)

    if (res.ok) {
        const subs = await res.json()
        dispatch(actionSearchSubs(subs))
    }
}



const initialState = {
    subsResults: {}
}
export default function searchReducer(state=initialState, action) {
    switch (action.type) {
        case SUB_SEARCH: {
            const newState = {...state, subsResults: {...state.subsResults}}

            newState.subsResults = {}
            action.subsResults.map(sub => newState.subsResults[sub.id] = {...sub})

            return newState
        }
        default: {
            return state
        }
    }
}