import React from 'react';
import {SafeAreaView, Button, FlatList, Modal, View} from 'react-native';
import PracticingComponent from '../component/PracticingComponent';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

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
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <SafeAreaView>
      <Modal transparent={true} visible={isLoading}>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            width: '50%',
            height: '50%',
            margin: 'auto',
          }}>
          <ActivityIndicator
            animating={true}
            color={MD2Colors.red800}
            size={'large'}
          />
        </View>
      </Modal>

      <FlatList
        data={mockData}
        keyExtractor={item => item.id}
        renderItem={renderFunction}
      />
    </SafeAreaView>
  );
}
