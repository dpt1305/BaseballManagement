import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ColorConst from '../const/ColorConst';
import 'react-native-vector-icons';
import {ActivityIndicator, Button, MD2Colors} from 'react-native-paper';
import MemberComponent from '../component/MemberComponent';
import axios from 'axios';
import RequestConst from '../const/RequestConst';
import {useFocusEffect} from '@react-navigation/native';

const mockFilter = [
  {number: 0, key: 'Tất cả'},
  {number: 1, key: 'Nghỉ nhiều hơn 1 buổi'},
  {number: 2, key: 'Nghỉ nhiều hơn 2 buổi'},
  {number: 3, key: 'Nghỉ nhiều hơn 3 buổi'},
  {number: 4, key: 'Nghỉ nhiều hơn 4 buổi'},
  {number: 5, key: 'Nghỉ nhiều hơn 5 buổi'},
];

const MemberScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [deletedUserId, setDeletedUserId] = useState(null);
  const [filter, setFilter] = useState(mockFilter[0]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const onDeleteMemberPromise = () => {
    setIsLoading(true);
    setIsDeleteModalVisible(false);
    axios
      .delete(
        `${RequestConst.baseURL}/api/v1/member/deleteMember?memberID=${deletedUserId}`,
      )
      .then(response =>
        axios.get(`${RequestConst.baseURL}/api/v1/member/getAllMember`),
      )
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.log('fail');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const renderFilterItem = item => {
    const eachItem = item.item;
    return (
      <TouchableOpacity
        style={[styles.item, eachItem.key === filter && styles.selectedItem]}
        onPress={() => {
          setFilter(eachItem);
          setIsFilterModalVisible(false);
        }}>
        <Text style={styles.itemText}>{eachItem.key}</Text>
      </TouchableOpacity>
    );
  };

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setIsLoading(true);
  //     axios
  //       .get(`${RequestConst.baseURL}/api/v1/member/getAllMember`)
  //       .then(response => {
  //         setTimeout(() => {
  //           setData(response.data);
  //           setIsLoading(false);
  //         }, 1000);
  //       })
  //       .catch(err => {
  //         console.error(err);
  //         setIsLoading(false);
  //       });
  //   }, []),
  // );
  React.useEffect(() => {
    setIsLoading(true);
    if (filter.number === 0) {
      axios
        .get(`${RequestConst.baseURL}/api/v1/member/getAllMember`)
        .then(response => {
          setTimeout(() => {
            setData(response.data);
            setIsLoading(false);
          }, 1000);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    } else {
      const number = filter.number;
      axios
        .put(
          `${RequestConst.baseURL}/api/v1/attendance/allMemberMissedMoreThanNumberOfSessions?numberOfSessions=${number}`,
        )
        .then(response => {
          setTimeout(() => {
            setData(response.data);
            setIsLoading(false);
          }, 1000);
        })
        .catch(err => {
          console.error(err);
          console.log(err);
          setIsLoading(false);
        });
    }
  }, [filter]);

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => {
          setIsFilterModalVisible(!isFilterModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select an Item</Text>
            <FlatList
              data={mockFilter}
              renderItem={renderFilterItem}
              keyExtractor={(item, idx) => `${item.key}_${idx}`}
            />
          </View>
        </View>
      </Modal>
      {data.length == 0 ? (
        <View>
          <Button
            icon="filter"
            mode="outlined"
            style={{
              margin: '5%',
            }}
            onPress={() => {
              setIsFilterModalVisible(true);
            }}>
            {filter.key}
          </Button>
          <Text>{'Không có thành viên nào'}</Text>
        </View>
      ) : (
        <View>
          <Button
            icon="filter"
            mode="outlined"
            style={{
              margin: '5%',
            }}
            onPress={() => {
              setIsFilterModalVisible(true);
            }}>
            {filter.key}
          </Button>
          <FlatList
            data={data}
            renderItem={({item}) => {
              return (
                <MemberComponent
                  navigation={navigation}
                  item={item}
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  isDeleteModalVisible={isDeleteModalVisible}
                  setIsDeleteModalVisible={setIsDeleteModalVisible}
                  deletedUserId={deletedUserId}
                  setDeletedUserId={setDeletedUserId}
                />
              );
            }}
            extraData={deletedUserId}
            keyExtractor={(item, idx) => `${item.memberID}_${idx}`}
          />
        </View>
      )}

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
              <Button onPress={onDeleteMemberPromise}>Đồng ý</Button>
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
  indicatorView: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '50%',
    height: '50%',
    margin: 'auto',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    height: '50%',
    margin: '10%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: '10%',
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  item: {
    padding: 10,
    marginVertical: 8,
    width: 200,
    borderRadius: 10,
    backgroundColor: ColorConst.primaryColor,
  },
  selectedItem: {
    backgroundColor: ColorConst.spaceGray,
  },
  itemText: {
    color: '#000',
    textAlign: 'center',
  },
});
export default MemberScreen;
