import {Text} from 'react-native';

import React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import PracticingScreen from '../screens/PracticingScreen';
import MemberScreen from '../screens/MemberScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import NavStack1 from './NavStack1';
import ScreenConst from '../const/ScreenConst';
import NavStack2 from './NavStack2';

const Drawer = createDrawerNavigator();

export default function DefaultNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={ScreenConst.PRACTICING_SCREEN}
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen
          name={ScreenConst.PRACTICING_SCREEN}
          component={NavStack1}
        />
        <Drawer.Screen name={ScreenConst.MEMBER_SCREEN} component={NavStack2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
