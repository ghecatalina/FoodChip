import {AUTH} from '../Constants/actionTypes';
import * as api from '../api/index';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        const {data} = await api.signIn(formData);
        dispatch({type: AUTH, data});
        navigate('/browse');
    }catch (error){
        console.log(error);
    }
}

export const register = (formData) => async (dispatch) => {
    try {
      const { data } = await api.register(formData);
  
      dispatch({ type: AUTH, data });
    } catch (error) {
      console.log(error);
    }
  };