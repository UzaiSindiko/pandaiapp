import * as C from '../constants';

const init = {
  list: [],
};

export default function reducer(state = init, action) {
  switch (action.type) {
    case C.ATTENDANCE_ERROR: {
      return {
        ...state,
        error: action.data,
        isLoad: false,
      };
    }
    case C.ATTENDANCE_LOADING: {
      return {
        ...state,
        isLoad: true,
      };
    }
    case C.ATTENDANCE_LOADED: {
      return {
        ...state,
        isLoad: false,
      };
    }
    case C.ATTENDANCE_DATA: {
      console.log(action.data);
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
