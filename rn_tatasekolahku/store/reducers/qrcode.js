import * as C from '../constants';

const init = {
  codeList: [],
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case C.QR_CODE_ERROR: {
      return {
        ...state,
        error: action.data,
        isLoad: false,
      };
    }
    case C.QR_CODE_LOADING: {
      return {
        ...state,
        isLoad: true,
      };
    }
    case C.QR_CODE_LOADED: {
      return {
        ...state,
        isLoad: false,
      };
    }
    case C.QR_CODE_DATA: {
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
