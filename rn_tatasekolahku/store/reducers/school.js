import * as C from '../constants';

const init = {
  _id: '',
  name: '',
  address: '',
  phone: '',
  picture: '',
  isLoad: false,
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case C.SCHOOL_ERROR: {
      return {
        ...state,
        error: action.data,
        isLoad: false,
      };
    }
    case C.SCHOOL_LOADING: {
      return {
        ...state,
        isLoad: true,
      };
    }
    case C.SCHOOL_LOADED: {
      return {
        ...state,
        isLoad: false,
      };
    }
    case C.SCHOOL_DATA: {
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
