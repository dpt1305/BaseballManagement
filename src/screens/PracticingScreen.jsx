import React from 'react';
import {SafeAreaView, Button, FlatList} from 'react-native';
import PracticingComponent from '../component/PracticingComponent';

export default function PracticingScreen({navigation}) {
  const mockData = [
    {
      id: '1',
      practiceName: 'The first basic practice',
      practiceTime: '13/05/2024',
      numberPracticer: '20/30',
    },
    {
      id: '2',
      practiceName: 'The first basic practice',
      practiceTime: '13/05/2024',
      numberPracticer: '20/30',
    },
    {
      id: '3',
      practiceName: 'The first basic practice',
      practiceTime: '13/05/2024',
      numberPracticer: '20/30',
    },
    {
      id: '4',
      practiceName: 'The first basic practice',
      practiceTime: '13/05/2024',
      numberPracticer: '20/30',
    },
    {
      id: '5',
      practiceName: 'The first basic practice',
      practiceTime: '13/05/2024',
      numberPracticer: '20/30',
    },
    {
      id: '6',
      practiceName: 'The first basic practice',
      practiceTime: '13/05/2024',
      numberPracticer: '20/30',
    },
  ];
  const renderFunction = ({item}) => {
    return (
      <PracticingComponent
        navigation={navigation}
        practiceName={item.practiceName}
        practiceTime={item.practiceTime}
        numberPracticer={item.numberPracticer}
      />
    );
  };
  return (
    <SafeAreaView>
      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={renderFunction}
      />
    </SafeAreaView>
  );
}
