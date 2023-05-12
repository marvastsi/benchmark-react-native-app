import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AccountScreen from '../modules/account/AccountScreen';
import DownloadScreen from '../modules/download/DownloadScreen';
import ExecutionScreen from '../modules/execution/ExecutionScreen';
import LoginScreen from '../modules/login/LoginScreen';
import MediaScreen from '../modules/media/MediaScreen';
import UploadScreen from '../modules/upload/UploadScreen';

const HomeStack = createNativeStackNavigator();

const ExecutionStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Execution" component={ExecutionScreen} />
      <HomeStack.Screen name="Login" component={LoginScreen} />
      <HomeStack.Screen name="Account" component={AccountScreen} />
      <HomeStack.Screen name="Download" component={DownloadScreen} />
      <HomeStack.Screen name="Upload" component={UploadScreen} />
      <HomeStack.Screen name="Media" component={MediaScreen} />
    </HomeStack.Navigator>
  );
};

export default ExecutionStackNavigator;