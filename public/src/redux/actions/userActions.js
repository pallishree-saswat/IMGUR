import { LOG_IN, LOG_OUT, REGISTER } from "../actionTypes";
import axios from "axios";
import config from '../../config'

export const register = user => async dispatch => {
    const { data } = await axios.post(`${config.BASE_URL}/user/register`, user)
    console.log(data)
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
        console.log(data)
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
