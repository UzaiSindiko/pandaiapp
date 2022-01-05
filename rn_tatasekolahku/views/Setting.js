/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';

import {
  VStack,
  HStack,
  Text,
  Heading,
  Box,
  ScrollView,
  Divider,
  ChevronRightIcon,
  Pressable,
} from 'native-base';
import dayjs from 'dayjs';

import {useNavigation} from '@react-navigation/native';

// Assets
import User from '../assets/svg/user.svg';
import Uni from '../assets/svg/uni.svg';

// State
import {useDispatch, useSelector} from 'react-redux';

const Card = ({icon, title, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <HStack bg="white" p="5" shadow={1} justifyContent="space-between">
        <HStack alignItems="center">
          {icon}
          <Heading
            textAlign="center"
            color="gray.600"
            fontSize="sm"
            ml="5"
            letterSpacing="2">
            {title}
          </Heading>
        </HStack>
        <ChevronRightIcon color="gray.400" />
      </HStack>
    </Pressable>
  );
};

const Header = () => {
  return (
    <HStack width="100%" bg="gray.500" px="3" height="84" alignItems="center">
      <Heading
        fontWeight="300"
        fontSize="lg"
        letterSpacing="2xl"
        color="warmGray.200">
        PENGATURAN
      </Heading>
    </HStack>
  );
};

export default function AttendanceList() {
  const navigation = useNavigation();

  const account = useSelector(state => state.user.account);

  return (
    <Box safeArea>
      <Header> </Header>
      <ScrollView>
        <VStack space="0" divider={<Divider />} p="5" pb="150">
          <Card
            icon={<User width={25} height={25} />}
            title="Pengaturan Akun"
            onPress={() => navigation.navigate('Profile')}
          />
          {account.includes('ADMINISTRATOR') && (
            <Card
              icon={<Uni width={25} height={25} />}
              title="Sekolah"
              onPress={() => navigation.navigate('SchoolEdit')}
            />
          )}
        </VStack>
      </ScrollView>

      <Pressable
        p="5"
        onPress={() =>
          Linking.openURL('instagram://user?username=uzai.sindiko').catch(
            () => {
              Linking.openURL('https://www.instagram.com/uzai.sindiko/');
            },
          )
        }>
        <Text
          fontSize="xs"
          color="gray.500"
          textAlign="center">{`Copyright © ${dayjs().format(
          'YYYY',
        )}, Uzai Sindiko`}</Text>
      </Pressable>
    </Box>
  );
}
