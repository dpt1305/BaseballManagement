import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ColorConst from '../const/ColorConst';
import ScreenConst from '../const/ScreenConst';

const mockData = {
  practiceName: 'The first basic practice',
  practiceTime: '13/05/2024',
  numberPracticer: '20/30',
};

export default function PracticingComponent({
  navigation,
  practiceName,
  practiceTime,
  numberPracticer,
  practiceID,
}) {
  const componentOnPress = () => {
    navigation.navigate(ScreenConst.ATTENDANCE_SCREEN, practiceID);
  };

  return (
    <TouchableOpacity onPress={componentOnPress}>
      <View style={styles.containerView}>
        <View style={styles.onTopView}>
          <Text style={styles.topTitle}>{practiceName}</Text>
        </View>

        <View style={styles.onBottomView}>
          {/* View left bottom */}
          <View style={styles.bottomLeftView}>
            <Text style={styles.bottomLeftText}>{practiceTime}</Text>
          </View>

          {/* View right bottom */}
          <View style={styles.bottomRightView}>
            <Text style={styles.bottomRightText}>
              {/* <Icon name="persion" /> */}
              People: {numberPracticer}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerView: {
    flexDirection: 'column',
    height: 130,
    width: 390,
    borderRadius: 15,
    padding: 15,
  },
  onTopView: {
    height: 150,
    backgroundColor: ColorConst.secondaryColor,
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderWidth: 1,
    borderColor: 'black',
    textAlign: 'center',
    justifyContent: 'center',
  },
  onBottomView: {
    height: 150,
    backgroundColor: ColorConst.white,
    flex: 1,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 15,
    //   height: 4,
    // },
    textAlign: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
  },
  topTitle: {
    textAlign: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'auto',
    fontSize: 18,
    fontWeight: 'bold',
  },
  bottomLeftView: {
    flex: 1,
    height: 'auto',
    textAlign: 'center',
    justifyContent: 'center',
  },
  bottomLeftText: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
  },
  bottomRightView: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
  },
  bottomRightText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
});
