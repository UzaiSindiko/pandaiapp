/* eslint-disable react-hooks/exhaustive-deps */
'use strict';

import React, {useState, useEffect} from 'react';

import {Platform} from 'react-native';
import {Text, useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

// State
import {useDispatch, useSelector} from 'react-redux';
import {checkIn} from '../store/actions/qrcode';

let checkAndroidPermission = true;
if (Platform.OS === 'android' && Platform.Version < 23) {
  checkAndroidPermission = false;
}

export default function ScanScreen() {
  const [data, setData] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();

  const error = useSelector(state => state.qrcode.error);

  useEffect(() => {
    if (!error) {
      return;
    }
    toast.show({
      title: error?.IND,
      status: 'error',
      placement: 'top',
    });
  }, [error]);

  const onSuccess = e => {
    dispatch(
      checkIn({
        qrCodeId: e.data,
        cb: () => navigation.navigate('SuccessScan'),
      }),
    );
  };

  return (
    <>
      <QRCodeScanner
        reactivate={true}
        reactivateTimeout={1000}
        cameraProps={{captureAudio: false}}
        checkAndroid6Permissions={checkAndroidPermission}
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
      />
    </>
  );
}
