import axios from '../../apis/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as C from '../constants';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export const getQrCode =
  ({cb}) =>
  async dispatch => {
    try {
      const {data} = await axios({
        url: '/v1/qr',
        method: 'GET',
      });

      dispatch({
        type: C.QR_CODE_DATA,
        data: {codeList: data},
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

export const checkIn =
  ({cb, qrCodeId}) =>
  async dispatch => {
    try {
      const {data} = await axios({
        url: '/v1/attendance/check-in',
        method: 'POST',
        data: {
          qrCodeId,
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
