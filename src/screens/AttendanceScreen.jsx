import {FlatList, SafeAreaView, SectionList, Text} from 'react-native';
import React, {useState} from 'react';
import AttendanceComponent from '../component/AttendanceComponent';

export default function AttendanceScreen({navigation}) {
  const mockData = [
    {
      id: '1',
      name: 'A guyen Van A',
      isChecked: false,
    },
    {
      id: '2',
      name: 'B guyen Van A',
      isChecked: true,
    },
    {
      id: '3',
      name: 'C guyen Van A',
      isChecked: true,
    },
    {
      id: '4',
      name: 'N guyen Van A',
      isChecked: false,
    },
    {
      id: '5',
      name: 'G uyen Van A',
      isChecked: false,
    },
    {
      id: '6',
      name: 'B guyen Van A',
      isChecked: true,
    },
    {
      id: '7',
      name: 'C guyen Van A',
      isChecked: true,
    },
    {
      id: '8',
      name: 'N guyen Van A',
      isChecked: false,
    },
    {
      id: '9',
      name: 'G uyen Van A',
      isChecked: false,
    },
    {
      id: '10',
      name: 'G uyen Van A',
      isChecked: false,
    },
    {
      id: '11',
      name: 'G uyen Van A',
      isChecked: false,
    },
  ];
  const rawCheckedIdArray = mockData
    .filter(e => e.isChecked === true)
    .map(e => e.id);

  const [checkedIdArray, setCheckedIdArray] = useState(rawCheckedIdArray);
  console.log(checkedIdArray);
  const renderItem = ({item}) => {
    return (
      <AttendanceComponent
        navigation={navigation}
        item={item}
        checkedIdArray={checkedIdArray}
        setCheckedIdArray={setCheckedIdArray}
      />
    );
  };

  return (
    <SafeAreaView>
      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}
