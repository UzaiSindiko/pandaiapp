import React, {useEffect} from 'react';
import {
  VStack,
  ArrowForwardIcon,
  Text,
  Center,
  Heading,
  NativeBaseProvider,
  Pressable,
  Image,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

// Assets
import {Logo} from '../assets/img';

export function Example() {
  const navigation = useNavigation();

  return (
    <VStack space={4} alignItems="center">
      <Heading textAlign="center" mb="10" color={'primary.500'}>
        PANDAI APP
      </Heading>
      <Image height={100} width={100} source={Logo} alt="logo" />

      <Heading textAlign="center" mb="10" fontSize="xl">
        Silahkan Pilih
      </Heading>

      <Pressable
        onPress={() => navigation.navigate('Login', {account: 'PRINCIPAL'})}>
        <VStack w="64" h="20" bg="primary.500" rounded="md" p="3" shadow={3}>
          <Text bold fontSize="md" color="warmGray.100">
            Kepala Sekolah
          </Text>
          <Text fontSize="xs" color="warmGray.100" width="80%">
            Principal / tekan tombol ini jika anda seorang kepala sekolah
          </Text>
          <Center position="absolute" bottom="0" right="0" pr="3">
            <ArrowForwardIcon color="warmGray.100" />
          </Center>
        </VStack>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate('Login', {account: 'TEACHER'})}>
        <VStack w="64" h="20" bg="secondary.500" rounded="md" p="3" shadow={3}>
          <Text bold fontSize="md" color="warmGray.100">
            Guru
          </Text>
          <Text fontSize="xs" color="warmGray.100" width="80%">
            Teacher / tekan tombol ini jika anda adalah guru
          </Text>
          <Center position="absolute" bottom="0" right="0" pr="3">
            <ArrowForwardIcon color="warmGray.100" />
          </Center>
        </VStack>
      </Pressable>

      <Pressable
        onPress={() =>
          navigation.navigate('Login', {account: 'ADMINISTRATOR'})
        }>
        <VStack w="64" h="20" bg="emerald.500" rounded="md" p="3" shadow={3}>
          <Text bold fontSize="md" color="warmGray.100">
            Administrator
          </Text>
          <Text fontSize="xs" color="warmGray.100" width="80%">
            Administrator / tekan tombol ini jika anda adalah admin
          </Text>
          <Center position="absolute" bottom="0" right="0" pr="3">
            <ArrowForwardIcon color="warmGray.100" />
          </Center>
        </VStack>
      </Pressable>
    </VStack>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
