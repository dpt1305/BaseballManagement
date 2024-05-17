import {
  DrawerActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import 'react-native-vector-icons';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ScreenConst from '../const/ScreenConst';
import MemberScreen from '../screens/MemberScreen';
import {Button} from 'react-native-paper';

export default function NavStack2() {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName={ScreenConst.MEMBER_SCREEN}
      screenOptions={{
        statusBarColor: '#0163d2',
        headerStyle: {
          // backgroundColor: '#0163d2',
        },
        // headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name={ScreenConst.MEMBER_SCREEN}
        component={MemberScreen}
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
                // onPress={() => navigation.navigate('AddPracticingScreen')}
              >
                Add
              </Button>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
