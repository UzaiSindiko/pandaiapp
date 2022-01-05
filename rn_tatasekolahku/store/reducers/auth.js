import * as C from '../constants';

const init = {
  isLogin: false,
  isLoad: false,
  error: null,
  cookie: null,
  loginError: [],
  signupError: [],
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case C.AUTH_LOADING: {
      return {
        ...state,
        isLoad: true,
      };
    }
    case C.AUTH_LOADING_CHECK_TOKEN: {
      return {
        ...state,
        isLoad: {
          checkToken: true,
        },
      };
    }
    case C.AUTH_LOADED: {
      return {
        ...state,
        isLoad: false,
      };
    }
    case C.AUTH_ERROR: {
      return {
        ...state,
        error: action.data,
        isLoad: false,
      };
    }
    case C.AUTH_LOGIN: {
      return {
        ...state,
        isLogin: true,
        isLoad: false,
      };
    }
    case C.AUTH_LOGOUT: {
      return {
        ...state,
        isLogin: false,
        isLoad: false,
      };
    }
    case C.AUTH_SET_ERR: {
      return {
        ...state,
        error: action.data,
        isLoad: false,
      };
    }
    case C.AUTH_COOKIE: {
      return {
        ...state,
        cookie: action.data,
        isLoad: false,
      };
    }
    case C.SET_LOGIN_ERROR: {
      return {
        ...state,
        loginError: action.data,
        isLoad: false,
      };
    }
    case C.SET_SIGNUP_ERROR: {
      return {
        ...state,
        signupError: action.data,
        isLoad: false,
      };
    }

    default:
      return state;
  }
}
