const GET_USER_PROFILE = 'user/getProfile'


const actionGetUserProfile = (user) => ({
    type: GET_USER_PROFILE,
    user
})



export const getUserProfile = (username) => async dispatch => {
    console.log('GET USER PROFILE THUNK HIT')
    const res = await fetch(`/api/users/${username}/profile`)

    if (res.ok) {
        console.log('GET USER PROFILE RES OK')
        const user = await res.json()
        dispatch(actionGetUserProfile(user))
    }
}


let initialState = {
    oneProfile: {}
}
export default function profileReducer (state=initialState, action) {
    switch(action.type) {
        case GET_USER_PROFILE: {
            console.log('USER PROFILE REDUCER HIT')
            const newState = {...state, oneProfile: {...state.oneProfile}}

            newState.oneProfile = {...action.user}
            console.log('ACTION SUBS', action.user.allSubcruddits)
            newState.oneProfile.allSubcruddits = {}
            newState.oneProfile.moddedSubs = {}
            newState.oneProfile.posts = {}

            action.user.allSubcruddits.map(sub => newState.oneProfile.allSubcruddits[sub.id] = {...sub})
            action.user.moddedSubs.map(sub => newState.oneProfile.moddedSubs[sub.id] = {...sub})
            action.user.posts.map(post => newState.oneProfile.posts[post.id] = {...post})
            console.log('newState Subs Profile', newState.oneProfile)

            return newState
        }
        default: {
            return state
        }
    }
}