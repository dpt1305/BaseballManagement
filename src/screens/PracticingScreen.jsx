import React, {useCallback} from 'react';
import {SafeAreaView, FlatList, Modal, View, StyleSheet} from 'react-native';
import PracticingComponent from '../component/PracticingComponent';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
import axios from 'axios';
import RequestConst from '../const/RequestConst';
import {useFocusEffect} from '@react-navigation/native';

export default function PracticingScreen({navigation}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [mockData, setData] = React.useState(null);

  useFocusEffect(
    useCallback(() => {
      axios
        .get(
          `${RequestConst.baseURL}/api/v1/practice/getPracticeSessionBetweenTwoDate?date1=2024-01-01&date2=2025-01-01`,
        )
        .then(response => {
          setTimeout(() => {
            setData(response.data);
            setIsLoading(false);
          }, 1000);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
    }, []),
  );

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
        practiceID={item.practiceID}
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
        keyExtractor={(item, idx) => `${item.id}_${idx}`}
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
