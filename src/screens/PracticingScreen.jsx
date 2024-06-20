import React, {useCallback} from 'react';
import {
  SafeAreaView,
  FlatList,
  Modal,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import PracticingComponent from '../component/PracticingComponent';
import {ActivityIndicator, Button, MD2Colors} from 'react-native-paper';
import axios from 'axios';
import RequestConst from '../const/RequestConst';
import {useFocusEffect} from '@react-navigation/native';
import ColorConst from '../const/ColorConst';

export default function PracticingScreen({navigation}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [mockData, setData] = React.useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = React.useState(false);
  const [practiceId, setPracticeId] = React.useState(null);
  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

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
  const onDeleteMemberPromise = () => {
    console.log('Delete button');
    setIsLoading(true);
    setIsDeleteModalVisible(false);
    axios
      .delete(
        `${RequestConst.baseURL}/api/v1/practice/deletePractice?practiceSessionID=${practiceId}`,
      )
      .then(() =>
        axios.get(
          `${RequestConst.baseURL}/api/v1/practice/getPracticeSessionBetweenTwoDate?date1=2024-01-01&date2=2025-01-01`,
        ),
      )
      .then(response => {
        setTimeout(() => {
          setData(response.data);
          setIsLoading(false);
        }, 1000);
      })
      .catch(error => {
        console.log('fail');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
        setIsDeleteModalVisible={setIsDeleteModalVisible}
        practiceId={practiceId}
        setPracticeId={setPracticeId}
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

      {/* Modal delete Practice  */}
      <Modal visible={isDeleteModalVisible} transparent={true}>
        <View style={styles.checkDeleteView}>
          {/* ON top */}
          <View style={styles.checkDeleteTopView}>
            <Text>Bạn chắn chắn muốn xoá?</Text>
          </View>

          {/* view on bottom */}
          <View style={{width: '100%'}}>
            {/* left */}
            <View style={styles.cancelView}>
              <Button
                title={'Huỷ'}
                onPress={() => setIsDeleteModalVisible(!isDeleteModalVisible)}>
                Huỷ
              </Button>
            </View>
            {/* right */}
            <View style={{backgroundColor: ColorConst.customedRed}}>
              <Button onPress={onDeleteMemberPromise} title={'Đồng ý'}>
                Đồng ý
              </Button>
            </View>
          </View>
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
  checkDeleteView: {
    margin: 'auto',
    width: '90%',
    height: '20%',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    flexDirection: 'column',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    backgroundColor: 'white',
    // elevation: 15,
  },
  checkDeleteTopView: {
    flex: 2,
  },
  cancelView: {
    backgroundColor: ColorConst.spaceGray,
    width: '100%',
    marginBottom: 3,
    color: 'black',
  },
});
