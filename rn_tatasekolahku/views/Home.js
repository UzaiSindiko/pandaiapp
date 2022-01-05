import * as React from 'react';
import {
  Box,
  HStack,
  Avatar,
  Text,
  VStack,
  Heading,
  Button,
  Center,
  Pressable,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

// Assets
import PhoneQr from '../assets/svg/phoneQr.svg';
import Qr from '../assets/svg/qr.svg';
import Contact from '../assets/svg/contacts.svg';
import Document from '../assets/svg/document.svg';
import Folder from '../assets/svg/folder.svg';
import QrCode from '../assets/svg/qrCode.svg';
import Plus from '../assets/svg/plus.svg';
import User from '../assets/svg/user.svg';

// State
import {useDispatch, useSelector} from 'react-redux';

function HomeScreen() {
  const navigation = useNavigation();
  const name = useSelector(state => state.user.name);
  const picture = useSelector(state => state.user.picture);
  const account = useSelector(state => state.user.account);

  return (
    <Box safeArea m="5">
      <VStack>
        <AvatarRender name={name} img={picture} />
        <InteractiveBannerRender />
        <HStack justifyContent="space-between" flexWrap="wrap">
          <AppIcon
            onPress={() => navigation.navigate('AttList')}
            bg="info.500"
            icon={<Contact width={50} height={50} />}
            title="Daftar Hadir Guru"
          />
          <AppIcon
            opacity={0.5}
            bg="success.500"
            icon={<Document width={50} height={50} />}
            title="Daftar Hadir Murid"
          />
          <AppIcon
            opacity={0.5}
            bg="fuchsia.500"
            icon={<Folder width={50} height={50} />}
            title="Laporan"
          />
          {Boolean(
            account &&
              account.length &&
              account.some(x => x === 'ADMINISTRATOR'),
          ) && (
            <AppIcon
              onPress={() => navigation.navigate('QRPage')}
              bg="fuchsia.500"
              icon={
                <Box alignItems="flex-end">
                  <Box position="absolute" zIndex={10}>
                    <Plus width={30} height={30} fill="white" opacity={0.9} />
                  </Box>
                  <QrCode width={40} height={40} fill="white" />
                </Box>
              }
              title="Buat Kode QR"
            />
          )}
        </HStack>
      </VStack>
    </Box>
  );
}

const AppIcon = ({icon, bg, title, opacity = 1, onPress}) => {
  return (
    <Center mb="5" opacity={opacity} bg="gray.100">
      <Pressable
        onPress={() => onPress && onPress()}
        width="81"
        height="81"
        bg={bg || 'success.500'}
        borderRadius="15"
        alignItems="center"
        justifyContent="center"
        mb="1">
        {icon}
      </Pressable>
      <Text bold width="100" textAlign="center" minHeight="30" lineHeight="15">
        {title}
      </Text>
    </Center>
  );
};

const InteractiveBannerRender = () => {
  const navigation = useNavigation();

  return (
    <HStack
      bg="primary.500"
      my="3"
      borderRadius="15"
      p="3"
      direction="row"
      justifyContent="space-between">
      <VStack space="1">
        <Heading color="primary.50" size="sm">
          Absen Cepat Tinggal Scan
        </Heading>
        <Button
          onPress={() => navigation.navigate('Scan')}
          leftIcon={
            <Box right="0">
              <Qr fill="#164e63" height={25} width={25} />
            </Box>
          }
          bg="primary.50"
          size="lg"
          mt="5"
          borderRadius="10">
          <Text bold color="primary.500">
            Scan QR Code
          </Text>
        </Button>
      </VStack>
      <Box right="0">
        <PhoneQr fill="#ecfeff" height={100} width={100} />
      </Box>
    </HStack>
  );
};

const AvatarRender = ({name, img = ''}) => {
  return (
    <HStack alignItems="center">
      {!img ? (
        <Box mr="2">
          <User width={25} height={25} />
        </Box>
      ) : (
        <Avatar
          bg="blue.400"
          mr="5"
          source={{
            uri: User,
          }}>
          AK
        </Avatar>
      )}
      <Text>{`Hallo, ${name}`}</Text>
    </HStack>
  );
};

export default HomeScreen;
