const GET_ALL_IMAGES = 'postImages/getAll'
const GET_POST_IMAGES = 'postImages/getOne'


const actionGetPostImages = (images) => ({
    type: GET_POST_IMAGES,
    images
})



export const getPostImages = (postIdArr) => async dispatch  => {
    let resArr = []
    for (let i = 0; i < postIdArr.length; i++) {
        const res = await fetch(`/api/post_images/${postIdArr[i]}`)

        if (res.ok) {
            resArr.push(res)
        }
    }

    if (resArr.length)  {
        let images = []
        for (let image of resArr) {
            const imageJson = await image.json()
            images.push(imageJson)
        }
        dispatch(actionGetPostImages(images))
    }

}



const initialState = {
    allPostImages: {},
    imagesByPost: {}
}
export default function postImageReducer(state=initialState, action) {
    switch(action.type){
        case GET_POST_IMAGES: {
            const newState = {...state, allPostImages: {...state.allPostImages}, imagesByPost: {...state.imagesByPost}}
            
            // newState.imagesByPost = {...action.images}
            Object.values(action.images).map(image => newState.imagesByPost[image.postId] = {...image})

            return newState
        }
        default:
            return state
    }
}