import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Routes from './src/routes';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <Routes />
  );
};

export default App;
