import { SET_PHOTO, TOGGLE_PHOTO_FETCHING_STATE } from '../actionTypes'
const initialState = {
    Photo: null,
    isPhotoFetching: false
}

const myReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_PHOTO:
            return { ...state, Photo: payload }
        case TOGGLE_PHOTO_FETCHING_STATE:
            return { ...state, isPhotoFetching: !state.isPhotoFetching }
        default:
            return state
    }
}
export default myReducer