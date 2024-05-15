/**
 * @format
 */
import * as React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import DefaultNavigation from './src/navigation/DefaultNavigation';
import App2 from './App2';
import App3 from './src/navigation/NavStack1';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Main() {
  return (
    <PaperProvider
      settings={{
        icon: props => <MaterialCommunityIcons {...props} />,
      }}>
      <DefaultNavigation />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
