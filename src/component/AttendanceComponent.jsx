import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorConst from '../const/ColorConst';
import {useFocusEffect} from '@react-navigation/native';

export default function AttendanceComponent({
  navigation,
  item,
  checkedIdArray,
  setCheckedIdArray,
}) {
  const [isCheckedState, setIsCheckState] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setIsCheckState(checkedIdArray.includes(item.memberID));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkedIdArray]),
  );

  const renderCheckbox = () => {
    if (isCheckedState) {
      return <Icon name="checkbox-marked-outline" size={30} />;
    } else {
      return <Icon name="checkbox-blank-outline" size={30} />;
    }
  };
  const onClick = () => {
    if (isCheckedState) {
      const updateCheckedIdArray = checkedIdArray.filter(
        e => e !== item.memberID,
      );
      setCheckedIdArray(updateCheckedIdArray);
    } else {
      checkedIdArray.push(item.memberID);
    }
    setIsCheckState(!isCheckedState);
  };

  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={item.memberName === '(Thành viên đã bị xóa)' ? true : false}>
      <View
        style={
          isCheckedState === true
            ? styles.checkedContainerView
            : styles.containerView
        }>
        <View style={styles.checkBoxView}>{renderCheckbox()}</View>

        <View style={styles.textView}>
          <Text style={styles.text}>{item.memberName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    height: 60,
    width: 370,
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'gray',
    margin: 10,
  },
  checkedContainerView: {
    flexDirection: 'row',
    height: 60,
    width: 370,
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'gray',
    margin: 10,
    backgroundColor: ColorConst.primaryColor,
  },
  checkBoxView: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  textView: {
    flex: 9,
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
