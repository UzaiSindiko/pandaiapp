/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  VStack,
  HStack,
  Text,
  Heading,
  Box,
  ScrollView,
  Divider,
  Center,
  Pressable,
  Spinner,
} from 'native-base';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

import {useNavigation, useIsFocused} from '@react-navigation/native';
import DatePicker from 'react-native-date-picker';

// Utilities
import capitalizeFirstLetter from '../helpers/capitalizeFirstLetter';
import convertTime12to24 from '../helpers/convertTime12to24';

// Assets
import Calendar from '../assets/svg/calendar.svg';

// State
import {useDispatch, useSelector} from 'react-redux';
import {getAttendance} from '../store/actions/attendance';

export default function AttendanceList() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const list = useSelector(state => state.attendance.list);
  const isLoad = useSelector(state => state.attendance.isLoad);

  const [date, setDate] = useState(new Date().toLocaleString());

  useEffect(() => {
    dispatch(
      getAttendance({
        date: date,
      }),
    );
  }, [isFocused, date]);

  return (
    <Box safeArea flex={1}>
      <Header date={date} setDate={setDate} />
      {isLoad ? (
        <Center flex={1}>
          <Spinner color="primary.500" size={'lg'} />
        </Center>
      ) : (
        <Body list={list} />
      )}
    </Box>
  );
}

const Body = ({list}) => {
  if (!list || !list.length) {
    return (
      <Center flex={1}>
        <Heading color="gray.500">Tidak Ada Data</Heading>
      </Center>
    );
  }

  return (
    <ScrollView>
      <VStack space="2" divider={<Divider />} p="5" pb="150">
        {list.map((x, i) => (
          <Card
            key={x._id + i}
            name={x.name}
            status={Boolean(x.attendance?.date)}
            time={x.attendance?.checkInTime}
          />
        ))}
      </VStack>
    </ScrollView>
  );
};

const Card = ({name, time, status}) => {
  let statusColor = 'gray.500';
  let statusText = '-';

  if (status) {
    statusText = 'PRESENT';
    statusColor = 'success.500';
  }

  return (
    <HStack
      bg="white"
      p="5"
      shadow={1}
      rounded="md"
      justifyContent="space-between">
      <Box width="35%">
        <Heading size="sm">{name}</Heading>
        <Text fontSize="xs" color="gray.400">
          nama
        </Text>
      </Box>
      <Box>
        <Heading textAlign="center" color={statusColor} size="sm">
          {time ? convertTime12to24(dayjs(time).format('hh:mm A')) : '-'}
        </Heading>
        <Text fontSize="xs" color="gray.400">
          Jam Hadir
        </Text>
      </Box>
      <Box width="30%">
        <Heading textAlign="center" color={statusColor} size="xs">
          {capitalizeFirstLetter(statusText)}
        </Heading>
        <Text textAlign="center" fontSize="xs" color="gray.400">
          keterangan
        </Text>
      </Box>
    </HStack>
  );
};

const Header = ({date, setDate}) => {
  const libDaysInInd = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    "Jum'at",
    'Sabtu',
  ];
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [open, setOpen] = useState(false);

  return (
    <>
      <DatePicker
        modal
        open={open}
        date={new Date(date)}
        mode="date"
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <HStack
        width="100%"
        bg="primary.500"
        px="3"
        height="100"
        alignItems="center">
        <Pressable onPress={() => setOpen(true)}>
          <Center flex="1">
            <Calendar transform={[{scale: 1.5}]} />
            <Text
              textAlign="center"
              lineHeight="xs"
              fontSize="xs"
              mt="1"
              color="warmGray.200">
              Ubah Tanggal
            </Text>
          </Center>
        </Pressable>
        <Center flex="2">
          <Heading
            fontWeight="300"
            fontSize="lg"
            letterSpacing="2xl"
            color="warmGray.200">
            KEHADIRAN
          </Heading>
          <Text bold fontSize="lg" color="warmGray.200">
            {dayjs(date).format('DD-MM-YYYY')}
          </Text>
        </Center>
        <Center flex="1">
          <Text bold color="warmGray.200" fontSize="lg">
            {libDaysInInd[Number(dayjs(date).format('d'))]}
          </Text>
        </Center>
      </HStack>
    </>
  );
};
