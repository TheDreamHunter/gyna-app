import {
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_SUCESS,
  OLD_PASSOWRD_CHANGED,
  NEW_PASSOWRD_CHANGED,
  CONFIRM_PASSOWRD_CHANGED,
  CHANGE_PASSWORD_FAILED,
  CLEAR_PASSOWRD
} from '../actions/types';

const INITIAL_STATE = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
  success: '',
  loading: false,
  message: '',
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case CLEAR_PASSOWRD:
      return { ...INITIAL_STATE, error: state.error };

    case OLD_PASSOWRD_CHANGED:
      return { ...state, oldPassword: action.oldPassword };

    case NEW_PASSOWRD_CHANGED:
      return { ...state, newPassword: action.newPassword };

    case CONFIRM_PASSOWRD_CHANGED:
      return { ...state, confirmPassword: action.confirmPassword };

    case CHANGE_PASSWORD:
      return { ...state, loading: true };

    case CHANGE_PASSWORD_SUCESS:
      console.log(action.result);
      return { ...state, ...INITIAL_STATE, message: action.result, success: 'true' };

    case CHANGE_PASSWORD_FAILED:
      console.log(action.result);
      return { ...state, ...INITIAL_STATE, success: 'false', error: action.error };

    default:
      return state;
  }
};