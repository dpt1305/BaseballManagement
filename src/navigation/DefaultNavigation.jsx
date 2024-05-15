import {Text} from 'react-native';

import React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import PracticingScreen from '../screens/PracticingScreen';
import MemberScreen from '../screens/MemberScreen';
import AttendanceScreen from '../screens/AttendanceScreen';
import NavStack1 from './NavStack1';

const Drawer = createDrawerNavigator();

export default function DefaultNavigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="Home" component={NavStack1} />
        <Drawer.Screen name="Notifications" component={AttendanceScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
