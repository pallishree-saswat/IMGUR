import { SET_PHOTO, TOGGLE_PHOTO_FETCHING_STATE } from '../actionTypes'
import axios from 'axios'
import config from '../../config'

export const fetchPHOTO = () => async (disptach, getState) => {
    try {
        const accessToken = getState().userState.user.accessToken
        console.log(accessToken)
        disptach({ type: TOGGLE_PHOTO_FETCHING_STATE })
        disptach({ type: SET_PHOTO, payload: null })
        console.log(`${config.BASE_URL}/myphotos/${accessToken}`)
        let { data } = await axios(`${config.BASE_URL}/myphotos/${accessToken}`)
        console.log(data)
        for (let i = 0; i < data.photo.length; i++) {
            data.photo[i].url = data.photo[i].url.split(',')
        }
        disptach({ type: SET_PHOTO, payload: data.photo })
    }
    catch (err) {
        console.log(err)
    }
    finally {
        disptach({ type: TOGGLE_PHOTO_FETCHING_STATE })
    }
}