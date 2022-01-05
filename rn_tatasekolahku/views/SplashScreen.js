import * as React from 'react';
import {
  Center,
  Spinner,
  Image,
  Box,
  HStack,
  VStack,
  Heading,
  Text,
} from 'native-base';
import dayjs from 'dayjs';

// Assets
import {Logo} from '../assets/img';

export const SplashScreen = () => {
  return (
    <VStack safeArea space={10}>
      <Center>
        <HStack space={2} alignItems="center">
          <Spinner
            accessibilityLabel="Loading posts"
            size={'lg'}
            color={'gray.600'}
          />
          <Heading color="gray.600" fontSize="xl">
            Loading
          </Heading>
        </HStack>
      </Center>
      <Image height={200} width={200} source={Logo} alt="logo" />
      <Box>
        <Heading textAlign={'center'} color="primary.500" fontSize="xl">
          PANDAI APP
        </Heading>
        <Text
          fontSize="xs"
          color="gray.500"
          textAlign="center">{`Copyright © ${dayjs().format('YYYY')}`}</Text>
        <Text textAlign={'center'} color={'gray.300'}>
          by uzai sindiko
        </Text>
      </Box>
    </VStack>
  );
};

export default () => {
  return (
    <Center p="5" flex={1} bgColor={'white'}>
      <SplashScreen />
    </Center>
  );
};
