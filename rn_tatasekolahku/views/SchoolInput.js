/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Text,
  Center,
  NativeBaseProvider,
  WarningOutlineIcon,
  useToast,
  TextArea,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

// State
import {useDispatch, useSelector} from 'react-redux';
import {createSchool} from '../store/actions/school';

const HeadingRender = ({account}) => {
  return (
    <Heading
      size="lg"
      fontWeight="600"
      color="primary.500"
      _dark={{
        color: 'warmGray.50',
      }}>
      Silahkan isi data sekolah anda
    </Heading>
  );
};

export const SchoolInput = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const toast = useToast();

  const error = useSelector(state => state.school.error);

  // state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [locErr, setLocErr] = useState({});

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

  const onPressSignupHandler = () => {
    let errMsg = {};
    if (!name || name.length < 4 || name.length > 100) {
      errMsg.name = 'Nama harus memiliki setidaknya 4 huruf';
    }
    setLocErr(errMsg);
    if (Object.keys(errMsg).length !== 0) {
      return;
    }
    dispatch(
      createSchool({
        name,
        phone,
        address,
        cb: () => {
          navigation.navigate('BottomTab');
        },
      }),
    );
  };

  return (
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <HeadingRender account={route?.params?.account} />
      <VStack space={3} mt="5">
        {/* Name   */}
        <FormControl isInvalid={locErr.name}>
          <FormControl.Label>Nama Sekolah</FormControl.Label>
          <Input
            value={name}
            onChangeText={setName}
            placeholder="Contoh: SMK Negeri 2 Woyla"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {locErr.name}
          </FormControl.ErrorMessage>
        </FormControl>

        {/* Address */}
        <FormControl isInvalid={locErr.phone}>
          <FormControl.Label>Alamat sekolah</FormControl.Label>
          <TextArea
            h={20}
            value={address}
            onChangeText={setAddress}
            placeholder="Contoh: Jalan Meulaboh - Kuala Bhee Km 32 Kecamatan Woyla Kabupaten Aceh Barat (23682), Darul Huda, Kec. Woyla, Kab. Aceh Barat Prov. Aceh"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {locErr.phone}
          </FormControl.ErrorMessage>
        </FormControl>

        {/* Phone */}
        <FormControl isInvalid={locErr.phone}>
          <FormControl.Label>
            Nomor Telepon Sekolah
            <Text color="gray.600">{' (Opsional)'}</Text>
          </FormControl.Label>
          <Input
            value={phone}
            onChangeText={setPhone}
            placeholder="Contoh: 081234567890"
            keyboardType={'number-pad'}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {locErr.phone}
          </FormControl.ErrorMessage>
        </FormControl>

        {/* Signup Button */}
        <Button onPress={onPressSignupHandler} mt="2" colorScheme="indigo">
          Lanjutkan
        </Button>
      </VStack>
    </Box>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <SchoolInput />
      </Center>
    </NativeBaseProvider>
  );
};
