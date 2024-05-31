import axios from 'axios';
import React, {useState} from 'react';
import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RequestConst from '../const/RequestConst';
import {ActivityIndicator, Button, MD2Colors} from 'react-native-paper';
import ScreenConst from '../const/ScreenConst';
import 'react-native-vector-icons';

export default function AddPracticingScreen({navigation}) {
  const [data, setData] = useState({
    practiceDate: '',
    endTime: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (attributeName, newText) => {
    setData({
      ...data,
      [attributeName]: newText,
    });
  };

  const onSaveButton = () => {
    setIsLoading(true);
    axios
      .post(`${RequestConst.baseURL}/api/v1/practice/newPracticeSession`, {
        ...data,
        content: 'content',
        totalActive: 0,
        totalAttend: 0,
      })
      .then(response => {
        // setData(response.data);
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate(ScreenConst.PRACTICING_SCREEN);
        }, 1000);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
        navigation.navigate(ScreenConst.PRACTICING_SCREEN);
      });
  };

  return (
    <SafeAreaView>
      <Modal visible={isLoading}>
        <View style={styles.indicatorView}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={'large'}
          />
        </View>
      </Modal>

      <ScrollView>
        <Button icon="content-save" mode="outlined" onPress={onSaveButton}>
          {'Lưu'}
        </Button>
        {/* Container */}
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Thời gian bắt đầu:</Text>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              onChangeText={text => onChange('practiceDate', text)}
              value={data.practiceDate}
            />
          </View>
        </View>
        {/* Container */}
        <View style={styles.container}>
          <View style={styles.titleView}>
            <Text style={styles.titleText}>Thời gian kết thúc:</Text>
          </View>
          <View style={styles.textInputView}>
            <TextInput
              style={styles.input}
              onChangeText={text => onChange('endTime', text)}
              value={data.endTime}
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
  indicatorView: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '50%',
    height: '50%',
    margin: 'auto',
  },
});
