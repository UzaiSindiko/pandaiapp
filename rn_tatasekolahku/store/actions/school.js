import axios from '../../apis/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as C from '../constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const createSchool =
  ({name, phone, address, cb}) =>
  async dispatch => {
    dispatch({
      type: C.SCHOOL_LOADING,
    });
    try {
      const {data} = await axios({
        url: '/v1/school',
        method: 'POST',
        data: {
          name,
          address,
          phone,
        },
      });

      dispatch({
        type: C.SCHOOL_DATA,
        data: data,
      });

      cb && cb();
    } catch (err) {
      if (err.response?.data?.msg) {
        console.log(err.response?.data?.msg);
      } else {
        console.log(err);
      }
      dispatch({
        type: C.SCHOOL_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };

export const updateSchool =
  ({name, address, phone, cb}) =>
  async dispatch => {
    try {
      dispatch({
        type: C.SCHOOL_LOADING,
      });

      const {data} = await axios({
        url: '/v1/school',
        method: 'PATCH',
        data: {
          name,
          address,
          phone,
        },
      });

      dispatch({
        type: C.SCHOOL_DATA,
        data: data,
      });

      cb && cb();
    } catch (err) {
      console.log('updateSchool');
      if (err.response?.data?.msg) {
        console.log(err.response?.data?.msg);
      } else {
        console.log(err);
      }
      dispatch({
        type: C.SCHOOL_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };

export const getSchool = cb => async dispatch => {
  try {
    dispatch({
      type: C.SCHOOL_ERROR,
      data: '',
    });
    dispatch({
      type: C.SCHOOL_LOADING,
    });

    const {data} = await axios({
      url: '/v1/school',
      method: 'GET',
    });

    dispatch({
      type: C.SCHOOL_DATA,
      data: data,
    });

    cb && cb();
  } catch (err) {
    if (err.response?.data?.msg) {
      console.log(err.response?.data?.msg);
    } else {
      console.log(err);
    }
    dispatch({
      type: C.SCHOOL_ERROR,
      data: err.response?.data?.msg,
    });
  }
};
