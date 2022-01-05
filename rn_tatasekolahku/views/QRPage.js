/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
let deviceWidth = Dimensions.get('window').width;
import {Box, VStack, Heading, Spinner, useToast} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import dayjs from 'dayjs';

// Utilities
import convertTime12to24 from '../helpers/convertTime12to24';

// Assets
import QRCode from 'react-native-qrcode-svg';

// State
import {useDispatch, useSelector} from 'react-redux';
import {getQrCode} from '../store/actions/qrcode';

const libDaysInInd = [
  'Minggu',
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  "Jum'at",
  'Sabtu',
];

function QRPage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const toast = useToast();
  const codeList = useSelector(state => state.qrcode.codeList);
  const error = useSelector(state => state.qrcode.error);

  const [dt, setDt] = useState(new Date().toLocaleString());
  const [activeCode, setActiveCode] = useState({});

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

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    let secTimer = setInterval(() => {
      const active = findActiveCode(codeList);
      setActiveCode(active);
    }, 30000); // 30000ms equal to 30s
    return () => clearInterval(secTimer);
  }, []);

  useEffect(() => {
    const active = findActiveCode(codeList);
    setActiveCode(active);
  }, [codeList]);

  useEffect(() => {
    dispatch(getQrCode({}));
  }, [dispatch]);

  return (
    <Box safeArea m="5">
      <VStack justifyContent="space-around" alignItems="center">
        <Title>Silahkan scan barcode untuk absen</Title>
        <Box width="30%" borderTopWidth="2" my="10%" borderColor="gray.400" />
        <Box
          px="4"
          py="6"
          borderWidth="1"
          width={deviceWidth - 50}
          height={deviceWidth - 50}
          justifyContent="center"
          alignItems="center">
          {activeCode?._id ? (
            <QRCode size={deviceWidth - 100} value={activeCode._id} />
          ) : (
            <Spinner color="primary.500" size="lg" />
          )}
        </Box>
        <Title color="gray.600">
          {dayjs(new Date().toLocaleString()).format('DD-MM-YYYY')}
          {'\n'}
          {libDaysInInd[Number(dayjs(new Date().toLocaleString()).format('d'))]}
        </Title>
        <Title fontWeight="700" color="gray.600">
          {convertTime12to24(dayjs(dt).format('h:mm:ss A'))}
        </Title>
      </VStack>
    </Box>
  );
}

const Title = params => {
  return (
    <Heading
      fontWeight="300"
      width="80%"
      letterSpacing="lg"
      color={'primary.500'}
      mt="10%"
      textAlign="center"
      {...params}>
      {params?.children}
    </Heading>
  );
};

const findActiveCode = list => {
  if (!list) {
    return [];
  }
  return list
    .slice()
    .reverse()
    .find(
      x =>
        new Date(x.validFrom) < new Date() &&
        new Date(x.validUntil) > new Date(),
    );
};

export default QRPage;
