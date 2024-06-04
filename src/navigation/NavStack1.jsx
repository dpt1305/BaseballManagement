import {DrawerActions, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PracticingScreen from '../screens/PracticingScreen';
import React from 'react';
import AttendanceScreen from '../screens/AttendanceScreen';
import {Button} from 'react-native-paper';
import 'react-native-vector-icons';
import AddPracticingScreen from '../screens/AddPracticingScreen';
import ScreenConst from '../const/ScreenConst';

export default function NavStack1() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Stack.Navigator
      initialRouteName={ScreenConst.PRACTICING_SCREEN}
      screenOptions={{
        statusBarColor: '#0163d2',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ScreenConst.PRACTICING_SCREEN}
        component={PracticingScreen}
        options={{
          headerLeft: () => {
            return (
              <Button
                icon="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              />
            );
          },
          headerRight: () => {
            return (
              <Button
                icon="plus-circle-outline"
                onPress={() =>
                  navigation.navigate(ScreenConst.ADD_PRACTICING_SCREEN)
                }
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={ScreenConst.ADD_PRACTICING_SCREEN}
        component={AddPracticingScreen}
      />
      <Stack.Screen
        name={ScreenConst.ATTENDANCE_SCREEN}
        component={AttendanceScreen}
        // options={{
        //   headerRight: () => {
        //     return (

        //     );
        //   },
        // }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
