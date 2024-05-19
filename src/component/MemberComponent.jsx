import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Button} from 'react-native-paper';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu';
import ColorConst from '../const/ColorConst';

export default function MemberComponent(props) {
  const toggleMenu = () => {
    props.setIsVisible(!props.isVisible);
  };

  return (
    <View style={styles.containerView}>
      <View style={styles.textView}>
        <Text>{props.item.name}</Text>
      </View>
      <View style={styles.buttonView}>
        <Button icon="dots-horizontal" onPress={toggleMenu} />
        <Modal visible={props.isVisible} transparent={true}>
          <TouchableWithoutFeedback onPress={toggleMenu}>
            <View style={styles.modalView}>
              <View style={styles.menuView}>
                <View style={styles.detailView}>
                  <Button onPress={() => {}}>Chi tiet</Button>
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
          </TouchableWithoutFeedback>
        </Modal>
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
    position: 'relative',
  },
  textView: {
    flex: 9,
    justifyContent: 'center',
    color: 'black',
  },
  buttonView: {
    flex: 3,
    justifyContent: 'center',
    // position: 'relative',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 254, 255, 0)',
  },
  menuView: {
    position: 'absolute',
    right: 45,
    top: 80,
    width: 150,
    maxHeight: 150,
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
