import { useNavigation, useRoute } from '@react-navigation/native';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';

type Person = {name: string, baseUrl: string};

const MediaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [inProgress, setInProgress] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Base Url: {baseUrl}</Text>
      <ProgressBar
          indeterminate={true}
          styleAttr='Large'
          animating={inProgress}
        />
    </View>
    
  );
};

export default MediaScreen;