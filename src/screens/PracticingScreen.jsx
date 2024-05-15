import React from 'react';
import {View, Text, SafeAreaView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const PracticingScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <Text> HOME</Text>
      <Button
        title="Press me"
        onPress={() => {
          navigation.push('Attendance');
        }}
      />
    </SafeAreaView>
  );
};

export default PracticingScreen;
