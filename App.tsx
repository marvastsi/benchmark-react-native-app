import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar
} from 'react-native';

import RootNavigator from './src/navigation';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <>
      <RootNavigator />
      <StatusBar barStyle="default" />
    </>
  );
};

// const HomeScreen = ({navigation}) => {
//   return (
//     <Button
//       title="Go to Jane's profile"
//       onPress={() =>
//         navigation.navigate('Profile', {name: 'Jane'})
//       }
//     />
//   );
// };

// const ProfileScreen = ({navigation, route}) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };

export default App;
