import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';
import ColorConst from '../const/ColorConst';
import 'react-native-vector-icons';
import {Button} from 'react-native-paper';
import MemberComponent from '../component/MemberComponent';

const MemberScreen = () => {
  const mockItem = {
    name: 'Nguyen Van A',
    position: ['SS', 'PA'],
  };
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  return (
    <SafeAreaView>
      <MemberComponent
        item={mockItem}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      />
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
                onPress={() => setIsDeleteModalVisible(!isDeleteModalVisible)}>
                Huỷ
              </Button>
            </View>
            {/* right */}
            <View style={{backgroundColor: ColorConst.customedRed}}>
              <Button>Đồng ý</Button>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

// const MemberComponent = props => {
//   const toggleMenu = () => {
//     props.setIsVisible(!props.isVisible);
//   };

//   return (
//     <View style={styles.containerView}>
//       <View style={styles.textView}>
//         <Text>{props.item.name}</Text>
//       </View>
//       <View style={styles.buttonView}>
//         <Button icon="dots-horizontal" onPress={toggleMenu} />
//         <Modal visible={props.isVisible} transparent={true}>
//           <TouchableWithoutFeedback onPress={toggleMenu}>
//             <View style={styles.modalView}>
//               <View style={styles.menuView}>
//                 <View style={styles.detailView}>
//                   <Button onPress={() => {}}>Chi tiet</Button>
//                 </View>
//                 <View style={styles.deleteView}>
//                   <Button
//                     onPress={() => {
//                       props.setIsDeleteModalVisible(true);
//                     }}>
//                     Xoá
//                   </Button>
//                 </View>
//               </View>
//             </View>
//           </TouchableWithoutFeedback>
//         </Modal>
//       </View>
//     </View>
//   );
// };

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
    // borderWidth: 1,
    // borderColor: 'grey',
  },
  deleteView: {
    backgroundColor: ColorConst.customedRed,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderWidth: 1,
    // borderColor: 'grey',
  },
  checkDeleteView: {
    margin: 'auto',
    width: 300,
    height: 150,
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
    // elevation: 15,
  },
  checkDeleteTopView: {
    flex: 2,
  },
  cancelView: {
    backgroundColor: ColorConst.spaceGray,
    width: '100%',
    marginBottom: 3,
  },
});
export default MemberScreen;
