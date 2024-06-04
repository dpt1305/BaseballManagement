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
import {ActivityIndicator, Button, MD2Colors} from 'react-native-paper';
import MemberComponent from '../component/MemberComponent';
import axios from 'axios';
import RequestConst from '../const/RequestConst';
import {useFocusEffect} from '@react-navigation/native';

const MemberScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [deletedUserId, setDeletedUserId] = useState(null);

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

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
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
    }, []),
  );

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
      {data.length == 0 ? (
        <Text>{'Không có thành viên nào'}</Text>
      ) : (
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
});
export default MemberScreen;
