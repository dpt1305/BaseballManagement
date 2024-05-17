import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function AddPracticingScreen() {
  const rawDataFromDB = {
    name: 'Nguyen van a',
    mainPosition: ['SS', 'SA', 'PA'],
  };
  const mockData = [
    {
      title: 'Tên',
      data: ['Nguyễn Văn A'],
    },
    {
      title: 'Vị trí',
      data: ['SS', 'SQ', 'PA'],
    },
  ];
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const onChangeName = newName => {
    setName(newName);
  };
  const onChangeTime = newTime => {
    setTime(newTime);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Container */}
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Tên buổi tập:</Text>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              value={name}
            />
          </View>
        </View>
        {/* Container */}
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Thời gian:</Text>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTime}
              value={time}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    width: 370,
    margin: 10,
  },
  titleView: {
    height: 45,
    flex: 3,
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
  },
  textInputView: {
    marginTop: 5,
    color: 'red',
    flex: 7,
  },
  input: {
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});
