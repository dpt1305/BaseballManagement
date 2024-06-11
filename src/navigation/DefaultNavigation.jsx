import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
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
        <Drawer.Screen name={'🏋️‍♂️ Buổi tập'} component={NavStack1} />
        <Drawer.Screen name={'🥎 Thành viên'} component={NavStack2} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
