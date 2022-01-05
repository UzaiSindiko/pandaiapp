import * as React from 'react';
import dayjs from 'dayjs';
import {Box, Heading, VStack, Button, Text, Center} from 'native-base';
import {useNavigation} from '@react-navigation/native';

// Utilities
import convertTime12to24 from '../helpers/convertTime12to24';

// Assets
import Success from '../assets/svg/success.svg';

// State
import {useDispatch, useSelector} from 'react-redux';

export const SuccessScan = () => {
  const navigation = useNavigation();
  const name = useSelector(state => state.user.name);
  // const picture = useSelector(state => state.user.picture);
  // const account = useSelector(state => state.user.account);

  return (
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <VStack space={5} mt="5">
        <Center>
          <Success width={150} height={150} />
          <Heading color="green.500" fontWeight="semibold">
            Berhasil
          </Heading>
        </Center>
        <Center>
          <Text textAlign="center" letterSpacing="1.5" fontSize="lg">
            Anda sudah tercatat hadir hari ini
          </Text>
          <Text mt="5" color="gray.600" fontSize="lg">
            {dayjs(new Date().toLocaleString()).format('DD-MM-YYYY')}
          </Text>
        </Center>
        <Center>
          <Heading mt="5" letterSpacing="1.5">
            {name}
          </Heading>
        </Center>
        <Center>
          <Heading mt="10" color="gray.600">
            {convertTime12to24(
              dayjs(new Date().toLocaleString()).format('h:mm:ss A'),
            )}
          </Heading>
        </Center>
        <Button
          size="lg"
          py="3"
          borderRadius="10"
          onPress={() => {
            navigation.navigate('BottomTab', {screen: 'Home'});
          }}>
          Beranda
        </Button>
      </VStack>
    </Box>
  );
};

export default () => {
  return (
    <Center p="5">
      <SuccessScan />
    </Center>
  );
};
