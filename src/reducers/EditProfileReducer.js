import {
  EDIT_USERNAME,
  EDIT_ADDRESS,
  EDIT_DATE,
  EDIT_EMAIL,
  EDIT_PHONE,
  EDIT_PROFILE,
  EDIT_PROFILE_FAILED,
  EDIT_PROFILE_SUCCESS,
  FETCH_USERDATA,
  FETCH_USERDATA_FAILED,
  FETCH_USERDATA_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  email: '',
  mobile: '',
  address: '',
  date: '',
  loading: false
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case FETCH_USERDATA:
      return { ...state, loading: true };

    case FETCH_USERDATA_SUCCESS:
      console.log(action.result);
      return {
        ...state, username: action.result.username, email: action.result.email, mobile: action.result.mobile,
        address: action.result.address, date: action.result.anniversary_date, loading: false
      };

    case FETCH_USERDATA_FAILED:
      console.log(action.result);
      return { ...state, ...INITIAL_STATE };

    case EDIT_USERNAME:
      return { ...state, username: action.payLoad };

    case EDIT_ADDRESS:
      return { ...state, address: action.payLoad };

    case EDIT_EMAIL:
      return { ...state, email: action.payLoad };

    case EDIT_PHONE:
      return { ...state, mobile: action.payLoad };

    case EDIT_DATE:
      return { ...state, date: action.payLoad };

    case EDIT_PROFILE:
      return { ...state, loading: true };

    case EDIT_PROFILE_SUCCESS:
    console.log(action.result);
      return {
        ...state, loading: false
      };

    case EDIT_PROFILE_FAILED:
      console.log(action.result);
      return {...state, loading: false };

    default:
      return state;
  }
};
