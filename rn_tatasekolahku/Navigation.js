// In App.js in a new project

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, Box} from 'native-base';

// State
import {useDispatch, useSelector} from 'react-redux';
import {isUserLogin} from './store/actions/auth';

// Assets
import Qr from './assets/svg/qr.svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

import Bookmark from './assets/svg/bookmark.svg';
import Settings from './assets/svg/settings.svg';

// Views
import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import OnBoard from './views/OnBoard';
import Profile from './views/Profile';
import Scan from './views/Scan';
import AttendanceList from './views/AttendanceList';
import QRPage from './views/QRPage';
import SuccessScan from './views/SuccessScan';
import SchoolInput from './views/SchoolInput';
import Setting from './views/Setting';
import SchoolEdit from './views/SchoolEdit';
import SplashScreen from './views/SplashScreen';

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {paddingBottom: 10},
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Bookmark fill={color} height={40} width={30} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        name="Scan"
        options={{
          tabBarLabel: 'Scan',
          tabBarIcon: ({color, size}) => (
            <Box borderRadius={10} bgColor={'primary.400'} mb="22">
              <Qr fill="white" height={50} width={50} />
            </Box>
          ),
        }}
        component={Scan}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          tabBarIcon: ({color, size}) => (
            <Settings fill={color} height={40} width={30} />
          ),
        }}
        name="Setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
}

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const isLoad = useSelector(state => state.auth.isLoad);

  useEffect(() => {
    dispatch(isUserLogin({}));
  }, [dispatch]);

  if (isLoad && isLoad.checkToken) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="BottomTab"
          component={BottomTab}
        />
        {!isLogin ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
                // animationTypeForReplace: !isLogin ? 'pop' : 'push',
              }}
              name="OnBoard"
              component={OnBoard}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="BottomTab"
              component={BottomTab}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SchoolInput"
              component={SchoolInput}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="AttList"
              component={AttendanceList}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="QRPage"
              component={QRPage}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SuccessScan"
              component={SuccessScan}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Profile"
              component={Profile}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="SchoolEdit"
              component={SchoolEdit}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
