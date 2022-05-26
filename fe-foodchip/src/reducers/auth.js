import * as actionType from '../Constants/actionTypes';

const authReducer = (state = {authData: null}, action) => {
    switch (action.type){
        case actionType.AUTH:
            localStorage.setItem('tk', action?.data.tk);
            localStorage.setItem('id', action?.data.id);
            localStorage.setItem('role', action?.data.role)
            return {...state, authData: action.data, errors: null};

        default:
        return state;
    }
}

export default authReducer;