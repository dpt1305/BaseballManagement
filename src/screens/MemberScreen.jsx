import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  FlatList,
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
  const mockData = [
    {
      id: '1',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '2',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '3',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '4',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '5',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '6',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '7',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '8',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },

    {
      id: '9',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '10',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '711',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
    {
      id: '812',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },

    {
      id: '913',
      name: 'Nguyen Van A',
      position: ['SS', 'PA'],
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [clickedRow, setClickedRow] = useState(null);
  return (
    <SafeAreaView>
      {/* <MemberComponent
        item={mockItem}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isDeleteModalVisible={isDeleteModalVisible}
        setIsDeleteModalVisible={setIsDeleteModalVisible}
      /> */}
      <FlatList
        data={mockData}
        renderItem={({item}) => {
          return (
            <MemberComponent
              item={item}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              isDeleteModalVisible={isDeleteModalVisible}
              setIsDeleteModalVisible={setIsDeleteModalVisible}
              clickedRow={clickedRow}
              setClickedRow={setClickedRow}
            />
          );
        }}
        extraData={clickedRow}
        keyExtractor={item => item.id}
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

const styles = StyleSheet.create({
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
  },
});
export default MemberScreen;
