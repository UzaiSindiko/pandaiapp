/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Text,
  Center,
  NativeBaseProvider,
  Pressable,
  WarningOutlineIcon,
  useToast,
  Spinner,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

// Assets
import EyeSlash from '../assets/svg/eye-slash.svg';
import Eye from '../assets/svg/eye.svg';

// State
import {useDispatch, useSelector} from 'react-redux';
import {signUp} from '../store/actions/auth';

const HeadingRender = ({account}) => {
  if (account === 'PRINCIPAL') {
    return (
      <Heading
        size="lg"
        fontWeight="600"
        color="primary.500"
        _dark={{
          color: 'warmGray.50',
        }}>
        Selamat Datang {'\n'}Kepala Sekolah
      </Heading>
    );
  } else if (account === 'ADMINISTRATOR') {
    return (
      <Heading
        size="lg"
        fontWeight="600"
        color="emerald.500"
        _dark={{
          color: 'warmGray.50',
        }}>
        Selamat Datang {'\n'}Administrator
      </Heading>
    );
  } else {
    return (
      <Heading
        size="lg"
        fontWeight="600"
        color="secondary.500"
        _dark={{
          color: 'warmGray.50',
        }}>
        Selamat Datang {'\n'}Pak/Buk Guru
      </Heading>
    );
  }
};

const EyeIcon = ({show, onPress}) => {
  return (
    <Pressable mr="2.5" onPress={onPress}>
      {show ? (
        <Eye width={18} height={18} fill="black" opacity={0.9} />
      ) : (
        <EyeSlash width={18} height={18} fill="black" opacity={0.9} />
      )}
    </Pressable>
  );
};

const phoneRegex =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

export const Signup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const toast = useToast();

  const error = useSelector(state => state.auth.error);
  const isLoad = useSelector(state => state.auth.isLoad);

  // state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [locErr, setLocErr] = useState({});
  const [showPass, setShowPass] = useState(false);

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

    // change all phone start from 08**** to +628***
    const phoneFormatted =
      phone.substring(0, 2) === '08' ? '+628' + phone.substring(2) : phone;
    if (!phoneFormatted.match(phoneRegex)) {
      errMsg.phone = 'Format nomor telepon salah';
    }

    if (!pass || pass.length < 8) {
      errMsg.pass = 'Password/Kata Sandi minimal 8 karakter';
    }

    if (!confirmPass || confirmPass !== pass) {
      errMsg.confirmPass = 'Password/Kata Sandi tidak sama';
    }

    setLocErr(errMsg);
    if (Object.keys(errMsg).length !== 0) {
      return;
    }

    dispatch(
      signUp({
        name,
        phone,
        password: pass,
        account: route?.params?.account || 'TEACHER',
        cb: () => {
          if (route?.params?.account === 'ADMINISTRATOR') {
            navigation.navigate('SchoolInput');
          } else {
            navigation.navigate('BottomTab');
          }
        },
      }),
    );
  };

  return (
    <Box safeArea p="2" w="90%" maxW="290" py="8">
      <HeadingRender account={route?.params?.account} />
      <Heading
        mt="1"
        color="coolGray.600"
        _dark={{
          color: 'warmGray.200',
        }}
        fontWeight="medium"
        size="xs">
        Daftar untuk melanjutkan
      </Heading>
      <VStack space={3} mt="5">
        {/* Name   */}
        <FormControl isInvalid={locErr.name}>
          <FormControl.Label>Nama</FormControl.Label>
          <Input value={name} onChangeText={setName} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {locErr.name}
          </FormControl.ErrorMessage>
        </FormControl>

        {/* Phone */}
        <FormControl isInvalid={locErr.phone}>
          <FormControl.Label>Nomor Telepon/HP</FormControl.Label>
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

        {/* Password */}
        <FormControl isInvalid={locErr.pass}>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            value={pass}
            onChangeText={setPass}
            type={showPass ? 'text' : 'password'}
            InputRightElement={
              <EyeIcon show={showPass} onPress={() => setShowPass(!showPass)} />
            }
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {locErr.pass}
          </FormControl.ErrorMessage>
        </FormControl>

        {/* Confirm Password */}
        <FormControl isInvalid={locErr.confirmPass}>
          <FormControl.Label>Konfirmasi Password</FormControl.Label>
          <Input
            value={confirmPass}
            onChangeText={setConfirmPass}
            type={showPass ? 'text' : 'password'}
            InputRightElement={
              <EyeIcon show={showPass} onPress={() => setShowPass(!showPass)} />
            }
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {locErr.confirmPass}
          </FormControl.ErrorMessage>
        </FormControl>

        {/* Signup Button */}
        <Button onPress={onPressSignupHandler} mt="2" colorScheme="indigo">
          {isLoad ? (
            <Spinner accessibilityLabel="Loading posts" color={'white'} />
          ) : (
            'Daftar'
          )}
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            {'Sudah Punya Akun '}
          </Text>
          <Text
            onPress={() => navigation.goBack()}
            fontSize="sm"
            color="indigo.500"
            fontWeight="medium">
            Masuk
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Signup />
      </Center>
    </NativeBaseProvider>
  );
};
