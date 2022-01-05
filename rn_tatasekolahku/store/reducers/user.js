import * as C from '../constants';

const init = {
  account: [],
  name: '',
  email: '',
  school: '',
  password: '',
  phone: '',
  picture: '',
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case C.USER_ERROR: {
      return {
        ...state,
        error: action.data,
        isLoad: false,
      };
    }
    case C.USER_LOADING: {
      return {
        ...state,
        isLoad: true,
      };
    }
    case C.USER_LOADED: {
      return {
        ...state,
        isLoad: false,
      };
    }
    case C.USER_DATA: {
      return {
        ...state,
        ...action.data,
        isLoad: false,
      };
    }
    default:
      return state;
  }
}
