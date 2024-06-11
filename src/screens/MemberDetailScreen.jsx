import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {ActivityIndicator, Button, MD2Colors, Modal} from 'react-native-paper';
import 'react-native-vector-icons';
import ColorConst from '../const/ColorConst';
import PositionModal from '../component/PositionModal';
import PositionsConst from '../const/PositionsConst';
import axios from 'axios';
import RequestConst from '../const/RequestConst';
import ScreenConst from '../const/ScreenConst';
import {useFocusEffect} from '@react-navigation/native';

export function MemeberDetailScreen(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [user, setUser] = useState(props.route.params);

  const [isLoading, setIsLoading] = useState(false);

  const [positionNames, setPositionNames] = useState(
    user.memberPositionSet.map(e => PositionsConst[e.positionID]).join(', '),
  );
  const [selectedPositionIds, setSelectedPositionIds] = useState(
    user.memberPositionSet.map(e => e.positionID),
  );

  const onSaveButton = () => {
    setIsLoading(true);
    // update positions
    const newPositions = {
      positionIDSet: selectedPositionIds,
    };
    const updatePositionPromise = axios.put(
      `${RequestConst.baseURL}/api/v1/member/setPositionOfMember?memberID=${user.memberID}`,
      newPositions,
    );

    // update user info
    const newUserInfo = {
      memberName: user.memberName,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      jerseyNumber: user.jerseyNumber,
      nickName: user.nickName,
      handedness: user.handedness,
    };
    const updateUserPromise = axios.put(
      `${RequestConst.baseURL}/api/v1/member/updateMember?memberID=${user.memberID}`,
      newUserInfo,
    );

    // call all in one
    Promise.all([updateUserPromise, updatePositionPromise])
      .then(() => {
        console.log('success');
        setIsLoading(false);
        props.navigation.navigate(ScreenConst.MEMBER_SCREEN);
      })
      .catch(() => {
        console.log('fail');
      });

    // change editable => false
    setIsEditable(false);
  };

  const onChangeEditable = () => {
    setIsEditable(!isEditable);
  };

  const handleInputChange = (attributeName, newText) => {
    setUser({...user, [attributeName]: newText});
  };

  const renderPosition = () => {
    return (
      <View style={styles.containverView}>
        {/* view on top */}
        <View style={styles.topView}>
          <Text style={styles.topText}>Vị trí</Text>
        </View>
        {/* view bottom */}
        <View style={styles.bottomView}>
          {isEditable === true ? (
            <TouchableOpacity
              style={{padding: 5}}
              onPress={() => setIsModalVisible(true)}>
              <Text>{positionNames}</Text>
            </TouchableOpacity>
          ) : (
            <TextInput
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Vị trí"
              editable={isEditable}
              value={positionNames}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* containver view */}
        <View style={styles.containverView}>
          {/* view on top */}
          <View style={styles.topView}>
            <Text style={styles.topText}>Họ và tên</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              blurOnSubmit={true}
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Họ và tên"
              selection={{start: user?.memberName.length || 0}}
              editable={isEditable}
              value={user.memberName}
              attributeName={'memberName'}
              autoFocus={isEditable}
              onChangeText={newText => handleInputChange('memberName', newText)}
            />
          </View>
        </View>
        {/* containver view */}
        <View style={styles.containverView}>
          {/* view on top */}
          <View style={styles.topView}>
            <Text style={styles.topText}>Biệt danh</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Biệt danh"
              selection={{start: user?.nickName.toString().length || 0}}
              editable={isEditable}
              value={user.nickName}
              onChangeText={newText => handleInputChange('nickName', newText)}
            />
          </View>
        </View>

        {renderPosition()}

        {/* containver view */}
        <View style={styles.containverView}>
          {/* view on top */}
          <View style={styles.topView}>
            <Text style={styles.topText}>Số điện thoại</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Số điện thoại"
              selection={{start: user?.phoneNumber.toString().length || 0}}
              editable={isEditable}
              value={user.phoneNumber}
              onChangeText={newText =>
                handleInputChange('phoneNumber', newText)
              }
            />
          </View>
        </View>
        {/* containver view */}
        <View style={styles.containverView}>
          {/* view on top */}
          <View style={styles.topView}>
            <Text style={styles.topText}>Ngày sinh</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Ngày sinh"
              selection={{start: user?.dateOfBirth.toString().length || 0}}
              editable={isEditable}
              value={user.dateOfBirth}
              onChangeText={newText =>
                handleInputChange('dateOfBirth', newText)
              }
            />
          </View>
        </View>
        {/* containver view */}
        <View style={styles.containverView}>
          {/* view on top */}
          <View style={styles.topView}>
            <Text style={styles.topText}>Số áo</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Số áo"
              selection={{start: user?.jerseyNumber.toString().length || 0}}
              editable={isEditable}
              value={user.jerseyNumber.toString()}
              onChangeText={newText =>
                handleInputChange('jerseyNumber', newText)
              }
            />
          </View>
        </View>
        {/* containver view */}
        <View style={styles.containverView}>
          {/* view on top */}
          <View style={styles.topView}>
            <Text style={styles.topText}>Cỡ áo</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Cỡ áo"
              // selection={{start: user.jerseySize.toString().length}}
              editable={isEditable}
              value={user.jerseySize}
              onChangeText={newText => handleInputChange('jerseySize', newText)}
            />
          </View>
        </View>
        {/* containver view */}
        <View style={styles.containverView}>
          {/* view on top */}
          <View style={styles.topView}>
            <Text style={styles.topText}>Trạng thái</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              style={
                isEditable === true
                  ? styles.editableInputText
                  : styles.inputText
              }
              placeholder="Trạng thái"
              selection={{start: user?.memberStatus.toString().length || 0}}
              editable={isEditable}
              value={user.memberStatus}
              onChangeText={newText =>
                handleInputChange('memberStatus', newText)
              }
            />
          </View>
        </View>

        {/* ################ edit button ########### */}
        <View style={isEditable ? styles.saveButton : styles.editButton}>
          {isEditable === true ? (
            <Button icon="content-save" onPress={onSaveButton}>
              {'Lưu'}
            </Button>
          ) : (
            <Button icon="pencil" onPress={onChangeEditable}>
              {'Chỉnh sửa'}
            </Button>
          )}
        </View>
      </ScrollView>
      <PositionModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        selectedPositionIds={selectedPositionIds}
        setSelectedPositionIds={setSelectedPositionIds}
        setPositionNames={setPositionNames}
        positionNames={positionNames}
      />
      <Modal transparent={true} visible={isLoading}>
        <View style={styles.indicatorView}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={'large'}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containverView: {
    flexDirection: 'column',
    height: 100,
    width: '90%',
    padding: '3%',
    // borderWidth: 2,
    // borderColor: 'gray',
    marginHorizontal: 'auto',
    marginTop: '1%',
    // backgroundColor: 'red',
  },
  topView: {
    flex: 2,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    fontSize: 30,
  },
  topText: {
    fontSize: 22,
  },
  bottomView: {
    flex: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: 'auto',
    height: 30,
    marginVertical: '3%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 15,
    borderWidth: 0.5,
  },
  inputText: {
    padding: 0,
    fontSize: 16,
    textAlign: 'center',
    height: 30,
    color: 'black',
  },
  editableInputText: {
    padding: 0,
    fontSize: 16,
    textAlign: 'left',
    height: 30,
    color: 'grey',
    marginHorizontal: '3%',
  },
  editButton: {
    width: '90%',
    height: 50,
    marginHorizontal: 'auto',
    marginVertical: '3%',
    backgroundColor: ColorConst.primaryColor,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  saveButton: {
    width: '90%',
    height: 50,
    marginHorizontal: 'auto',
    marginVertical: '5%',
    backgroundColor: ColorConst.secondaryColor,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
  },
  indicatorView: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    width: '50%',
    height: '50%',
    margin: 'auto',
  },
});
