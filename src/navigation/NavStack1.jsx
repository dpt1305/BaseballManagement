import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PracticingScreen from '../screens/PracticingScreen';
import React from 'react';
import AttendanceScreen from '../screens/AttendanceScreen';
import {Button} from 'react-native-paper';
import 'react-native-vector-icons';
import AddPracticingScreen from '../screens/AddPracticingScreen';
import ScreenConst from '../const/ScreenConst';
import MemberScreen from '../screens/MemberScreen';
// import 'react-native-gesture-handler';

export default function NavStack1() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    // <NavigationContainer>
    <Stack.Navigator
      initialRouteName="HOME"
      screenOptions={{
        statusBarColor: '#0163d2',
        headerStyle: {
          // backgroundColor: '#0163d2',
        },
        // headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="HOME"
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
                onPress={() => navigation.navigate('AddPracticingScreen')}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name={ScreenConst.ADD_PRACTICING_SCREEN}
        component={AddPracticingScreen}
        options={{
          headerRight: () => {
            return (
              <Button
                icon="plus-circle-outline"
                onPress={() => {}}
                // icon={require('../assets/icons8-save-50.png')}
              >
                Add
              </Button>
            );
          },
        }}
      />
      <Stack.Screen
        name={ScreenConst.ATTENDANCE_SCREEN}
        component={AttendanceScreen}
        options={{
          headerRight: () => {
            return (
              <Button
                icon="content-save-outline"
                onPress={() => {}}
                // icon={require('../assets/icons8-save-50.png')}
              >
                Save
              </Button>
            );
          },
        }}
      />
    </Stack.Navigator>
    // </NavigationContainer>
  );
}
