/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  HStack,
  Center,
  NativeBaseProvider,
  WarningOutlineIcon,
  Pressable,
  useToast,
  Spinner,
} from 'native-base';
import {useNavigation, useRoute, useIsFocused} from '@react-navigation/native';

// Assets
import EyeSlash from '../assets/svg/eye-slash.svg';
import Eye from '../assets/svg/eye.svg';

// State
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../store/actions/auth';

const phoneRegex =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

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

export const Login = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const toast = useToast();

  const error = useSelector(state => state.auth.error);
  const isLoad = useSelector(state => state.auth.isLoad);

  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
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

  const loginHandler = () => {
    let errMsg = {};

    // change all phone start from 08**** to +628***
    const phoneFormatted =
      phone.substring(0, 2) === '08' ? '+628' + phone.substring(2) : phone;
    if (!phoneFormatted.match(phoneRegex)) {
      errMsg.phone = 'Format nomor telepon salah';
    }

    if (!pass || pass.length < 8) {
      errMsg.pass = 'Password/Kata Sandi minimal 8 karakter';
    }

    setLocErr(errMsg);
    if (Object.keys(errMsg).length !== 0) {
      return;
    }

    dispatch(
      login({
        phone,
        password: pass,
        cb: () => navigation.navigate('BottomTab'),
      }),
    );
  };

  const HeadingRender = () => {
    const account = route?.params?.account;

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

  return (
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <HeadingRender />
      <Heading
        mt="1"
        _dark={{
          color: 'warmGray.200',
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs">
        Silahkan login untuk melanjutkan
      </Heading>

      <VStack space={3} mt="5">
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
        <Button mt="2" colorScheme="indigo" onPress={loginHandler}>
          {isLoad ? (
            <Spinner accessibilityLabel="Loading posts" color={'white'} />
          ) : (
            'Masuk'
          )}
        </Button>
        <HStack mt="6" justifyContent="center">
          <Text
            fontSize="sm"
            color="coolGray.600"
            _dark={{
              color: 'warmGray.200',
            }}>
            {'Saya Pengguna Baru. '}
          </Text>
          <Text
            onPress={() =>
              navigation.navigate('Signup', {
                account: route?.params?.account || 'TEACHER',
              })
            }
            fontSize="sm"
            color="indigo.500"
            fontWeight="medium">
            Daftar
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
        <Login />
      </Center>
    </NativeBaseProvider>
  );
};
