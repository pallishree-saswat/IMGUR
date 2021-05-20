import { SET_IMAGES, TOGGLE_IMAGE_FETCHING_STATE } from '../actionTypes'
import axios from 'axios'
import config from '../../config'
export const fetchTrendingImages = () => async disptach => {
    try {
        disptach({ type: TOGGLE_IMAGE_FETCHING_STATE })
        disptach({ type: SET_IMAGES, payload: null })
        let { data } = await axios(`${config.BASE_URL}/publicimages`)
        disptach({ type: SET_IMAGES, payload: data })
    }
    catch (err) {
        console.log(err)
    }
    finally {
        disptach({ type: TOGGLE_IMAGE_FETCHING_STATE })
    }
}

export const fetchHomeImages = () => async (disptach, getState) => {
    try {
        disptach({ type: TOGGLE_IMAGE_FETCHING_STATE })
        if (getState().userState.user!==null) {
            const accessToken = getState().userState.user.accessToken
            console.log(accessToken)
            disptach({ type: TOGGLE_IMAGE_FETCHING_STATE })
            disptach({ type: SET_IMAGES, payload: null })
            let { data } = await axios(`${config.BASE_URL}/images/${getState().userState.user.accessToken}`)
            console.log(data)
            if(data==='Server Error'){
                localStorage.removeItem('user')
            }
            for (let i = 0; i < data.images.length; i++) {
                data.images[i].url = data.images[i].url.split(',')
            }
            disptach({ type: SET_IMAGES, payload: data.images })
        }
        else {
            disptach({ type: SET_IMAGES, payload: null })
            let { data } = await axios(`${config.BASE_URL}/publicimages`)
            for (let i = 0; i < data.images.length; i++) {
                data.images[i].url = data.images[i].url.split(',')
            }
            disptach({ type: SET_IMAGES, payload: data.images })
        }
    }
    catch (err) {
    console.log(err)
}
finally {
    disptach({ type: TOGGLE_IMAGE_FETCHING_STATE })
}
}
