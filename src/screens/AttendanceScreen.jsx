import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import AttendanceComponent from '../component/AttendanceComponent';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import RequestConst from '../const/RequestConst';
import {ActivityIndicator, Button, MD2Colors, Modal} from 'react-native-paper';
import 'react-native-vector-icons';
import ScreenConst from '../const/ScreenConst';

export default function AttendanceScreen(props) {
  const [checkedIdArray, setCheckedIdArray] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceStateList, setAttendanceStateList] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const practiceId = props.route.params;
      setIsLoading(true);
      axios
        .get(
          `${RequestConst.baseURL}/api/v1/practice/getPracticeSessionByID?practiceID=${practiceId}`,
        )
        .then(response => {
          setTimeout(() => {
            const attendanceList = response.data.attendDTOSet;
            setAttendanceStateList(attendanceList);
            setData(attendanceList);
            const rawCheckedIdArray = attendanceList
              .filter(e => e.isAttend === 1)
              .map(e => e.memberID);
            setCheckedIdArray(rawCheckedIdArray);
            setIsLoading(false);
          }, 1000);
        })
        .catch(error => {
          console.error(error);
          setIsLoading(false);
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onUpdateButton = () => {
    const practiceId = props.route.params;
    const requestAttendanceList = attendanceStateList.map(e => {
      return {
        memberName: e.memberName,
        memberID: e.memberID,
        isAttend: checkedIdArray.includes(e.memberID) ? 1 : 0,
      };
    });
    setIsLoading(true);
    axios
      .put(
        `${RequestConst.baseURL}/api/v1/attendance/practiceAttend?practiceID=${practiceId}`,
        {
          attendDTOSet: requestAttendanceList,
        },
      )
      .then(response => {
        setIsLoading(false);
        props.navigation.navigate(ScreenConst.PRACTICING_SCREEN);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const renderItem = ({item}) => {
    return (
      <AttendanceComponent
        navigation={props.navigation}
        item={item}
        checkedIdArray={checkedIdArray}
        setCheckedIdArray={setCheckedIdArray}
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
      <Button
        icon="content-save-outline"
        onPress={onUpdateButton}
        style={styles.outlineButton}>
        Update
      </Button>
      <FlatList
        data={data}
        keyExtractor={(item, idx) => `${item.memberID}_${idx}`}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  indicatorView: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '100%',
    height: '100%',
    margin: 'auto',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: 'grey',
    margin: '5%',
  },
});
