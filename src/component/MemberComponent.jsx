import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';

import ColorConst from '../const/ColorConst';

export default function MemberComponent(props) {
  const toggleMenu = () => {
    if (props.clickedRow == null) {
      props.setClickedRow(props.item.id);
    } else {
      props.setClickedRow(null);
    }
  };

  return (
    <View
      style={
        props.clickedRow !== props.item.id
          ? styles.containerView
          : styles.containerViewMargin
      }>
      <View style={styles.textView}>
        <Text>{props.item.name}</Text>
      </View>
      <View style={styles.buttonView}>
        <Button icon="dots-horizontal" onPress={toggleMenu} />
        <View
          style={
            props.clickedRow !== props.item.id
              ? styles.menuDisableView
              : styles.menuView
          }>
          <View style={styles.detailView}>
            <Button onPress={() => {}}>Chi tiếtt</Button>
          </View>
          <View style={styles.deleteView}>
            <Button
              onPress={() => {
                props.setIsDeleteModalVisible(true);
              }}>
              Xoá
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    height: 50,
    width: 370,
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'gray',
    margin: 10,
  },
  containerViewMargin: {
    flexDirection: 'row',
    height: 50,
    width: 370,
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'gray',
    margin: 10,
    marginBottom: 50,
  },
  textView: {
    flex: 9,
    justifyContent: 'center',
    color: 'black',
    position: 'relative',
  },
  buttonView: {
    flex: 3,
    justifyContent: 'center',
    position: 'relative',
  },
  // modalView: {
  //   // width: '100%',
  //   // height: '100%',
  //   backgroundColor: 'rgba(255, 254, 255, 0)',
  //   position: 'absolute',
  //   display: 'none',
  // },
  // modalDisableView: {
  //   // width: '100%',
  //   // height: '100%',
  //   backgroundColor: 'rgba(255, 254, 255, 0)',
  //   position: 'absolute',
  //   display: 'none',
  // },
  menuDisableView: {
    display: 'none',
  },
  menuView: {
    position: 'absolute',
    top: -5,
    right: 30,
    width: 150,
    maxHeight: 'auto',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  detailView: {
    // backgroundColor: ColorConst.primaryColor,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  deleteView: {
    backgroundColor: ColorConst.customedRed,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderWidth: 1,
    // borderColor: 'grey',
  },
});
