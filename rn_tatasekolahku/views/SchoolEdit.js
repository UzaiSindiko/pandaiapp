/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Center,
  TextArea,
  Spinner,
  HStack,
  useToast,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

// State
import {useDispatch, useSelector} from 'react-redux';
import {getSchool, updateSchool} from '../store/actions/school';

export const SchoolEdit = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const toast = useToast();

  const school = useSelector(state => state.school);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const updateSchoolHandler = () => {
    dispatch(
      updateSchool({
        schoolId: school._id,
        name,
        address,
        phone,
        cb: () =>
          toast.show({
            title: 'Success update',
            placement: 'top',
          }),
      }),
    );
  };

  useEffect(() => {
    setName(school.name);
    setAddress(school.address);
    setPhone(school.phone);
  }, [school]);

  useEffect(() => {
    dispatch(getSchool());
  }, []);

  useEffect(() => {
    if (!school.error) {
      return;
    }
    toast.show({
      title: school.error?.IND,
      status: 'error',
      placement: 'top',
    });
  }, [school.error]);

  return (
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading
        size="lg"
        color="coolGray.800"
        _dark={{
          color: 'warmGray.50',
        }}
        fontWeight="semibold">
        Profil Sekolah
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
        <FormControl>
          <FormControl.Label>Nama Sekolah</FormControl.Label>
          <Input value={name} onChangeText={setName} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Alamat Sekolah</FormControl.Label>
          <TextArea h={24} value={address} onChangeText={setAddress} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Nomor Telepon/HP</FormControl.Label>
          <Input
            value={phone}
            onChangeText={setPhone}
            keyboardType={'number-pad'}
          />
        </FormControl>
        {school.isLoad ? (
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
            onPress={updateSchoolHandler}
            colorScheme="primary"
            mt="2"
            height="50"
            justifySelf="flex-end">
            Simpan
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default () => {
  return (
    <Center p="5">
      <SchoolEdit />
    </Center>
  );
};
