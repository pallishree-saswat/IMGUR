import { SET_FAV, TOGGLE_FAV_FETCHING_STATE, ADD_FAV, REMOVE_FAV } from '../actionTypes'
const initialState = {
    fav: null,
    isfavFetching: false
}

const favReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_FAV:
            if(payload!=='No Favourite' && payload!== null){
                localStorage.setItem('fav',JSON.stringify(payload))
            }
            return { ...state, fav: payload }
        case TOGGLE_FAV_FETCHING_STATE:
            return { ...state, isfavFetching: !state.isfavFetching }
        case ADD_FAV:
            return {...state, fav:payload}
        case REMOVE_FAV:
            return { ...state,fav: payload}
        default:
            return state
    }
}
export default favReducer