import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';

import ExecutionStackNavigator from './ExecutionStack';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <ExecutionStackNavigator />
    </NavigationContainer>
  );
};

export default RootNavigator;