import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    loading: false,
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payLoad };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payLoad };
        case LOGIN_USER:
            return { ...state, loading: true };
        case LOGIN_USER_SUCCESS:
            console.log(action.result);
            return { ...state, ...INITIAL_STATE, user: action.result };
        default:
            return state;
    }

};