import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as C from '../constants';
import auth from './auth';
import user from './user';
import school from './school';
import qrcode from './qrcode';
import attendance from './attendance';

const allReducers = combineReducers({
  auth,
  user,
  school,
  qrcode,
  attendance,
});

const rootReducer = (state, action) => {
  if (action.type === C.DESTROY_SESSION) {
    state = {};
  }
  return allReducers(state, action);
};

// Apply thunk middleware so we can do asynchronous dispatch
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
