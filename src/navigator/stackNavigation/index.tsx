import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Date_Time_Screen from '../../screens/home';
import {screenNames} from '../../utils/screenNames';
import FileUpload from '../../screens/fileUpload';
import DemoScreen from '../../screens/main/index';
import ProfilePicture from '../../screens/cwcProfileScreen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={screenNames.MAIN} component={DemoScreen} />
      <Stack.Screen name={screenNames.DATE_TIME} component={Date_Time_Screen} />
      <Stack.Screen name={screenNames.FILE_UPLOAD} component={FileUpload} />
      <Stack.Screen
        name={screenNames.PROFILE_SCREEN}
        component={ProfilePicture}
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
