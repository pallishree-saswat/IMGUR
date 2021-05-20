import { SET_IMAGES, TOGGLE_IMAGE_FETCHING_STATE } from '../actionTypes'
const initialState = {
    image: null,
    isImageFetching: false
}

const imageReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_IMAGES:
            return { ...state, image: payload }
        case TOGGLE_IMAGE_FETCHING_STATE:
            return { ...state, isImageFetching: !state.isImageFetching }
        default:
            return state
    }
}
export default imageReducer