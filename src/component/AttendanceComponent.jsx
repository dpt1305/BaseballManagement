import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorConst from '../const/ColorConst';

const mockData = {
  name: 'Nguyen Van A',
  isChecked: false,
};

export default function AttendanceComponent({
  navigation,
  item,
  checkedIdArray,
  setCheckedIdArray,
}) {
  const [isCheckedState, setIsCheckState] = useState(
    checkedIdArray.includes(item.id),
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
      const updateCheckedIdArray = checkedIdArray.filter(e => e !== item.id);
      setCheckedIdArray(updateCheckedIdArray);
    } else {
      checkedIdArray.push(item.id);
    }
    setIsCheckState(!isCheckedState);
    console.log(checkedIdArray);
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={
          isCheckedState === true
            ? styles.checkedContainerView
            : styles.containerView
        }>
        <View style={styles.checkBoxView}>{renderCheckbox()}</View>

        <View style={styles.textView}>
          <Text style={styles.text}>{item.name}</Text>
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
