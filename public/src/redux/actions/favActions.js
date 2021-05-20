import { SET_FAV, TOGGLE_FAV_FETCHING_STATE } from '../actionTypes'
import axios from 'axios'
import config from '../../config'

export const fetchFav = () => async (disptach, getState) => {
    try {
        const accessToken = getState().userState.user.accessToken
        disptach({ type: TOGGLE_FAV_FETCHING_STATE })
        disptach({ type: SET_FAV, payload: null })
        let { data } = await axios(`${config.BASE_URL}/myfav/${accessToken}`)
        for (let i = 0; i < data.fav.length; i++) {
            data.fav[i].photoDetail.url = data.fav[i].photoDetail.url.split(',')
        }
        if(data.fav.length===0){
            disptach({ type: SET_FAV, payload: 'No Favourite' })
        }
        else{
            disptach({ type: SET_FAV, payload: data.fav })
        }
    }
    catch (err) {
        console.log(err)
    }
    finally {
        disptach({ type: TOGGLE_FAV_FETCHING_STATE })
    }
}

export const addFav = (photoId) => async (disptach, getState) => {
    try {
        const accessToken = getState().userState.user.accessToken
        await axios.post(`${config.BASE_URL}/user/addfav/${photoId}/${accessToken}`)
        let { data } = await axios(`${config.BASE_URL}/myfav/${accessToken}`)
        for (let i = 0; i < data.fav.length; i++) {
            data.fav[i].photoDetail.url = data.fav[i].photoDetail.url.split(',')
        }
        disptach({ type: SET_FAV, payload: data.fav })
    }
    catch (err) {
        console.log(err)
    }
}

export const removeFav = (favId) => async (disptach, getState) => {
    try {
        const accessToken = getState().userState.user.accessToken
        await axios.delete(`${config.BASE_URL}/user/removefav/${favId}/${accessToken}`)
        let { data } = await axios(`${config.BASE_URL}/myfav/${accessToken}`)
        for (let i = 0; i < data.fav.length; i++) {
            data.fav[i].photoDetail.url = data.fav[i].photoDetail.url.split(',')
        }
        if(data.fav.length===0){
            disptach({ type: SET_FAV, payload: 'No Favourite' })
        }
        else{
            disptach({ type: SET_FAV, payload: data.fav })
        }
    }
    catch (err) {
        console.log(err)
    }
}