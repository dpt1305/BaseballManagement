import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ColorConst from '../const/ColorConst';
import ScreenConst from '../const/ScreenConst';

export default function MemberComponent(props) {
  const showDeletePopup = () => {
    props.setIsDeleteModalVisible(true);
  };
  const moveToMemberDetail = () => {
    props.navigation.navigate(ScreenConst.MEMBER_DETAIL_SCREEN);
  };

  return (
    <TouchableOpacity
      onLongPress={showDeletePopup}
      onPress={moveToMemberDetail}
      style={styles.containerView}>
      <View style={styles.textView}>
        <Text style={styles.text}>{props.item.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'row',
    height: 65,
    width: 370,
    borderRadius: 15,
    padding: 10,
    borderWidth: 2,
    borderColor: 'gray',
    margin: 10,
    backgroundColor: 'white',
  },
  textView: {
    flex: 9,
    justifyContent: 'center',
    color: 'black',
    position: 'relative',
  },
  text: {fontSize: 20},
  buttonView: {
    flex: 3,
    justifyContent: 'center',
    position: 'relative',
  },
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
  },
});
