import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

axios.defaults.baseURL = 'https://pandaiapi.uzaisindiko.com';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    }
    // tell which platform is making the requestP
    // so its easier to debug on cloudwatch logger
    config.headers.platform = 'ANDROID';
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
