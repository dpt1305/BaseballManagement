import React, {useState} from 'react';
import {
  SafeAreaView,
  Button,
  FlatList,
  Modal,
  View,
  StyleSheet,
} from 'react-native';
import PracticingComponent from '../component/PracticingComponent';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import axios from 'axios';
import RequestConst from '../const/RequestConst';

export default function PracticingScreen({navigation}) {
  // const mockData = [
  //   {
  //     id: '1',
  //     practiceName: 'The first basic practice',
  //     practiceTime: '13/05/2024',
  //     numberPracticer: '20/30',
  //   },
  //   {
  //     id: '2',
  //     practiceName: 'The first basic practice',
  //     practiceTime: '13/05/2024',
  //     numberPracticer: '20/30',
  //   },
  //   {
  //     id: '3',
  //     practiceName: 'The first basic practice',
  //     practiceTime: '13/05/2024',
  //     numberPracticer: '20/30',
  //   },
  //   {
  //     id: '4',
  //     practiceName: 'The first basic practice',
  //     practiceTime: '13/05/2024',
  //     numberPracticer: '20/30',
  //   },
  //   {
  //     id: '5',
  //     practiceName: 'The first basic practice',
  //     practiceTime: '13/05/2024',
  //     numberPracticer: '20/30',
  //   },
  //   {
  //     id: '6',
  //     practiceName: 'The first basic practice',
  //     practiceTime: '13/05/2024',
  //     numberPracticer: '20/30',
  //   },
  // ];

  const [isLoading, setIsLoading] = React.useState(true);
  const [mockData, setData] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(
        `${RequestConst.baseURL}/api/v1/practice/getPracticeSessionBetweenTwoDate?date1=2024-01-01&date2=2025-01-01`,
      )
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const renderFunction = ({item}) => {
    const rawDate = `${item.practiceDate}`;
    const date = rawDate.substring(0, 10);
    const name = `Buổi tập: ${date}`;
    const practicerNumber = `${item.totalAttend}/${item.totalActive}`;
    return (
      <PracticingComponent
        navigation={navigation}
        practiceName={name}
        practiceTime={date}
        numberPracticer={practicerNumber}
      />
    );
  };
  return (
    <SafeAreaView>
      <Modal transparent={true} visible={isLoading}>
        <View style={styles.indicatorView}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={'large'}
          />
        </View>
      </Modal>

      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={renderFunction}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  indicatorView: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '50%',
    height: '50%',
    margin: 'auto',
  },
});
