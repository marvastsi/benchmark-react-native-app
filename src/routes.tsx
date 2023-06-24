import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CustomAppBar from './components/CustomAppBar';
import AccountScreen from './modules/account/AccountScreen';
import ConfigScreen from './modules/config/ConfigScreen';
import DownloadScreen from './modules/download/DownloadScreen';
import ExecutionScreen from './modules/execution/ExecutionScreen';
import LoginScreen from './modules/login/LoginScreen';
import MediaScreen from './modules/media/MediaScreen';
import UploadScreen from './modules/upload/UploadScreen';

const AppStack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator initialRouteName='Green Benchmark' screenOptions={{
      header: (props) => <CustomAppBar {...props} />
    }}>
      <AppStack.Screen name='AppConfig' component={ConfigScreen} />
      <AppStack.Screen name='Green Benchmark' component={ExecutionScreen} />
      <AppStack.Screen name='Login' component={LoginScreen} />
      <AppStack.Screen name='Account' component={AccountScreen} />
      <AppStack.Screen name='Download' component={DownloadScreen} />
      <AppStack.Screen name='Upload' component={UploadScreen} />
      <AppStack.Screen name='Media' component={MediaScreen} />
    </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;