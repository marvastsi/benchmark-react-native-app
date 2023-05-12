import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import ConfigScreen from '../modules/config/ConfigScreen';
import ExecutionScreen from '../modules/execution/ExecutionScreen';

const HomeStack = createNativeStackNavigator();

const ExecutionStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="AppConfig" component={ConfigScreen} />
      {/** FIXME: adjust this navigation flow */}
      <HomeStack.Screen name="Execution" component={ExecutionScreen} />
    </HomeStack.Navigator>
  );
};

export default ExecutionStackNavigator;