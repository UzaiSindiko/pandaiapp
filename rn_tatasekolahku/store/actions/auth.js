import axios from '../../apis/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as C from '../constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const isUserLogin =
  ({cb}) =>
  async dispatch => {
    try {
      dispatch({
        type: C.AUTH_LOADING_CHECK_TOKEN,
      });

      const token = await AsyncStorage.getItem('token');

      if (token) {
        const {data} = await axios({
          url: '/v1/auth/token',
          method: 'POST',
        });

        dispatch({
          type: C.AUTH_LOGIN,
        });
        dispatch({
          type: C.USER_DATA,
          data: data.userData,
        });
      } else {
        throw 'token invalid';
      }
      cb && cb();
    } catch (err) {
      console.log(err);
      dispatch({
        type: C.AUTH_LOGOUT,
      });
      dispatch({
        type: C.USER_DATA,
        data: {
          account: '',
          name: '',
          email: '',
          password: '',
          phone: '',
          picture: '',
        },
      });
      dispatch({
        type: C.AUTH_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };

export const signUp =
  ({name, password, account, phone, cb}) =>
  async dispatch => {
    try {
      dispatch({
        type: C.AUTH_LOADING,
      });

      const {data} = await axios({
        url: '/v1/auth/register',
        method: 'POST',
        data: {
          name,
          password,
          account,
          phone,
        },
      });

      const {token, userData} = data;

      await AsyncStorage.setItem('token', token);

      dispatch({
        type: C.USER_DATA,
        data: userData,
      });
      dispatch({
        type: C.AUTH_LOGIN,
      });

      cb && cb();
    } catch (err) {
      if (err.response?.data?.msg) {
        console.log(err.response?.data?.msg);
      } else {
        console.log(err);
      }
      dispatch({
        type: C.AUTH_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };

export const login =
  ({phone, password, cb}) =>
  async dispatch => {
    dispatch({
      type: C.AUTH_LOADING,
    });

    try {
      const {data} = await axios({
        url: '/v1/auth/login',
        method: 'POST',
        data: {
          phone,
          password,
        },
      });

      const {token, userData} = data;

      await AsyncStorage.setItem('token', token);

      dispatch({
        type: C.USER_DATA,
        data: userData,
      });
      dispatch({
        type: C.AUTH_LOGIN,
      });

      cb && cb();
    } catch (err) {
      dispatch({
        type: C.AUTH_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };

export const logout =
  ({cb}) =>
  async dispatch => {
    try {
      dispatch({
        type: C.AUTH_LOADING,
      });

      dispatch({
        type: C.DESTROY_SESSION,
      });

      await AsyncStorage.removeItem('token');

      cb && cb();
    } catch (err) {
      console.log(err, 'err');
      dispatch({
        type: C.AUTH_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };

export const userUpdate =
  ({name, email, phone, cb}) =>
  async dispatch => {
    dispatch({
      type: C.AUTH_LOADING,
    });

    try {
      const {data} = await axios({
        url: '/v1/auth/user',
        method: 'PATCH',
        data: {
          name,
          email,
          phone,
        },
      });

      dispatch({
        type: C.USER_DATA,
        data: data,
      });

      dispatch({
        type: C.AUTH_LOADED,
      });

      cb && cb();
    } catch (err) {
      console.log(err.response?.data?.msg, '<<');
      dispatch({
        type: C.AUTH_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };
