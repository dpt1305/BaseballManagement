import React from 'react';
import {
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
// MANAGER('MANA'),
//   PITCHER('P'),
//   CATCHER('C'),
//   FIRST_BASEMEN('1B'),
//   SECOND_BASEMEN('2B'),
//   THIRD_BASEMEN('3B'),
//   SHORTSTOP('SS'),
//   LEFT_FIELDER('LF'),
//   CENTER_FIELDER('CF'),
//   RIGHT_FILEDER('RF'),
//   DESIGNATED_HITTER('DH'),
//   OUT_FIELDER('OF');
export default function PositionModal(props) {
  const mockPositionData = [
    {
      positionID: 1,
      positionName: 'MANA',
    },
    {
      positionID: 2,
      positionName: 'P',
    },

    {
      positionID: 3,
      positionName: 'C',
    },
    {
      positionID: 4,
      positionName: '1B',
    },
    {
      positionID: 5,
      positionName: '2B',
    },
    {
      positionID: 6,
      positionName: '3B',
    },
    {
      positionID: 7,
      positionName: 'SS',
    },
    {
      positionID: 8,
      positionName: 'LF',
    },
    {
      positionID: 9,
      positionName: 'CF',
    },
    {
      positionID: 10,
      positionName: 'RF',
    },
    {
      positionID: 11,
      positionName: 'DH',
    },
    {
      positionID: 12,
      positionName: 'OF',
    },
  ];

  const toggleCheckbox = ({item}) => {
    if (props.selectedPositionIds.includes(item.positionID)) {
      const updateIds = props.selectedPositionIds.filter(
        e => e != item.positionID,
      );
      props.setSelectedPositionIds(updateIds);
    } else {
      const updateIds = [...props.selectedPositionIds, item.positionID];
      props.setSelectedPositionIds(updateIds);
    }
  };
  const onClickDoneButton = () => {
    const newPositionNames = mockPositionData
      .filter(e => props.selectedPositionIds.includes(e.positionID))
      .map(e => e.positionName)
      .join(', ');

    props.setPositionNames(newPositionNames);
    props.setIsModalVisible(false);
  };
  const renderItem = ({item}) => {
    const checkBoxStatus = props.selectedPositionIds.includes(item.positionID)
      ? 'checked'
      : 'unchecked';
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.positionName}</Text>
        <Checkbox
          status={checkBoxStatus}
          onPress={() => toggleCheckbox({item})}
          onValueChange={() => toggleCheckbox(item.positionID)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.isModalVisible}
        onRequestClose={() => props.setIsModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={mockPositionData}
              renderItem={renderItem}
              keyExtractor={item => item.positionID.toString()}
            />
            <Button
              style={{marginTop: 5}}
              title="Xong"
              onPress={onClickDoneButton}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '75%',
    height: '70%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});
