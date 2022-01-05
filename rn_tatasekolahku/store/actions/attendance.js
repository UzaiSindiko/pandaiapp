import axios from '../../apis/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as C from '../constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const getAttendance =
  ({cb, date}) =>
  async dispatch => {
    try {
      dispatch({
        type: C.ATTENDANCE_LOADING,
      });

      const {data} = await axios({
        url: '/v1/attendance',
        method: 'POST',
        data: {
          date: date,
        },
      });

      dispatch({
        type: C.ATTENDANCE_DATA,
        data: {
          list: data,
        },
      });

      cb && cb();
    } catch (err) {
      if (err.response?.data?.msg) {
        console.log(err.response?.data?.msg);
      } else {
        console.log(err);
      }
      dispatch({
        type: C.QR_CODE_ERROR,
        data: err.response?.data?.msg,
      });
    }
  };
