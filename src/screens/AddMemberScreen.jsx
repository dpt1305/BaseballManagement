import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PositionModal from '../component/PositionModal';
import ColorConst from '../const/ColorConst';
import {ActivityIndicator, Button, MD2Colors, Modal} from 'react-native-paper';
import RequestConst from '../const/RequestConst';
import axios from 'axios';
import ScreenConst from '../const/ScreenConst';

export default function AddMemberScreen({navigation}) {
  const [positionNames, setPositionNames] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  // const positionIds = mockData.memberPositionSet.map(e => e.positionID);
  const [selectedPositionIds, setSelectedPositionIds] = React.useState([]);

  const onSaveButton = () => {
    setIsLoading(true);
    // update positions
    const newPositions = {
      positionIDSet: selectedPositionIds,
    };

    // update user info
    const newUserInfo = {
      memberName: user.memberName,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      jerseyNumber: user.jerseyNumber,
      nickName: user.nickName,
      handedness: user.handedness,
    };

    // call api
    axios
      .post(`${RequestConst.baseURL}/api/v1/member/newMember`, newUserInfo)
      .then(response =>
        axios.put(
          `${RequestConst.baseURL}/api/v1/member/setPositionOfMember?memberID=${response.data.memberID}`,
          newPositions,
        ),
      )
      .then(response => {
        console.log('success');
      })
      .catch(error => {
        console.log('fail');
      })
      .finally(() => {
        setIsLoading(false);
        navigation.navigate(ScreenConst.MEMBER_SCREEN);
      });
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
          <TouchableOpacity
            style={{padding: 5}}
            onPress={() => setIsModalVisible(true)}>
            <Text>{positionNames}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
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
              style={styles.inputText}
              placeholder="Họ và tên"
              // selection={{start: user.memberName.toString().length}}
              editable={true}
              value={user.memberName}
              attributeName={'memberName'}
              autoFocus={true}
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
              style={styles.inputText}
              placeholder="Biệt danh"
              editable={true}
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
              style={styles.inputText}
              placeholder="Số điện thoại"
              editable={true}
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
              style={styles.inputText}
              placeholder="Ngày sinh"
              editable={true}
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
              style={styles.inputText}
              placeholder="Số áo"
              editable={true}
              value={user.jerseyNumber}
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
            <Text style={styles.topText}>Tay thuận</Text>
          </View>
          {/* view bottom */}
          <View style={styles.bottomView}>
            <TextInput
              style={styles.inputText}
              placeholder="Tay thuận"
              editable={true}
              value={user.handedness}
              onChangeText={newText => handleInputChange('handedness', newText)}
            />
          </View>
        </View>

        {/* ################ edit button ########### */}
        <View style={styles.saveButton}>
          <Button icon="content-save" onPress={onSaveButton}>
            {'Lưu'}
          </Button>
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
