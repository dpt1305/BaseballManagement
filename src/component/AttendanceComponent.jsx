import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorConst from '../const/ColorConst';

const mockData = {
  name: 'Nguyen Van A',
  isChecked: false,
};

export default function AttendanceComponent(props) {
  const [isCheckedState, setIsCheckState] = useState(
    mockData.isChecked === true ? true : false,
  );

  const renderCheckbox = () => {
    if (isCheckedState) {
      return <Icon name="checkbox-marked-outline" size={30} />;
    } else {
      return <Icon name="checkbox-blank-outline" size={30} />;
    }
  };
  const onClick = () => setIsCheckState(!isCheckedState);

  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={
          isCheckedState === true
            ? styles.checkedContainerView
            : styles.containerView
        }>
        <View style={styles.checkBoxView}>{renderCheckbox(mockData)}</View>

        <View style={styles.textView}>
          <Text>{mockData.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    height: 50,
    width: 390,
    borderRadius: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
  },
  checkedContainerView: {
    flexDirection: 'row',
    height: 50,
    width: 390,
    borderRadius: 15,
    padding: 10,
    backgroundColor: ColorConst.primaryColor,
    borderWidth: 1,
    borderColor: 'gray',
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
});
