import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  HStack,
  Spinner,
  useToast,
  WarningOutlineIcon,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

// Assets
// import Lock from '../assets/svg/lock.svg';
import Logout from '../assets/svg/logout.svg';

// State
import {useDispatch, useSelector} from 'react-redux';
import {logout, userUpdate} from '../store/actions/auth';

const phoneRegex =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

export const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();

  const user = useSelector(state => state.user);
  const isLoad = useSelector(state => state.auth.isLoad);
  const error = useSelector(state => state.auth.error);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
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
  }, [error, toast]);

  const logoutHandler = () => {
    dispatch(logout({cb: () => navigation.navigate('OnBoard')}));
  };

  const updateUserHandler = () => {
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

    setLocErr(errMsg);
    if (Object.keys(errMsg).length !== 0) {
      return;
    }

    dispatch(
      userUpdate({
        name,
        email,
        phone,
        cb: () => {
          toast.show({
            title: 'success update profile',
            placement: 'top',
          });
        },
      }),
    );
  };

  return (
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: 'warmGray.50',
        }}
        fontWeight="semibold">
        Profil
      </Heading>
      <Heading
        mt="1"
        color="coolGray.600"
        _dark={{
          color: 'warmGray.200',
        }}
        fontWeight="medium"
        size="xs">
        selamat datang
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
        <FormControl isInvalid={locErr.email}>
          <FormControl.Label>Email</FormControl.Label>
          <Input value={email} onChangeText={setEmail} />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {locErr.email}
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
        {/* <Button
          leftIcon={
            <Box>
              <Lock width={20} height={20} />
            </Box>
          }
          rightIcon={<ArrowForwardIcon color="primary.500" />}
          mt="2"
          variant="outline"
          colorScheme="primary">
          Ubah password
        </Button> */}
        {user.isLoad ? (
          <Center>
            <HStack>
              <Spinner accessibilityLabel="Loading posts" />
              <Heading ml="1" color="primary.500" fontSize="md">
                Loading
              </Heading>
            </HStack>
          </Center>
        ) : (
          <Button
            onPress={updateUserHandler}
            colorScheme="primary"
            mt="2"
            height="50"
            justifySelf="flex-end">
            {isLoad ? (
              <Spinner accessibilityLabel="Loading posts" color={'white'} />
            ) : (
              'Simpan'
            )}
          </Button>
        )}
        <Button
          onPress={logoutHandler}
          mt="5"
          alignSelf={'flex-end'}
          size="sm"
          variant="subtle"
          bgColor="gray.200"
          endIcon={
            <Box>
              <Logout fill="black" height={20} width={20} />
            </Box>
          }
          _text={{
            color: 'gray.500',
          }}>
          Logout
        </Button>
      </VStack>
    </Box>
  );
};

export default () => {
  return (
    <Center p="5">
      <Profile />
    </Center>
  );
};
