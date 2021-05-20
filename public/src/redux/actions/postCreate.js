import { LOG_IN, LOG_OUT, REGISTER } from "../actionTypes";
import axios from "axios";
import config from '../../config'

export const register = (file,title='dummy',description='dummy') => async (dispatch,getState) => {
    const accessToken = getState().userState.user.accessToken

    const { data } = await axios.post(`${config.BASE_URL}/user/imageupload/${accessToken}`, file)

    dispatch({
        type: REGISTER,
        payload: data
    })
}

export const logIn = user => async dispatch => {
    const { data } = await axios.post(`${config.BASE_URL}/user/login`, user)
    const chk = []
    console.log(data)
    if (chk.length !== 0) {
        console.log('invalid')
        dispatch({
            type: 'INVALID',
            payload: 'INVALID CREDENTIALS'
        })
    }
    else {
        dispatch({
            type: LOG_IN,
            payload: data
        });
    }
};

export const logOut = () => {
    return {
        type: LOG_OUT
    };
};
