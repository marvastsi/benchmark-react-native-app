import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator } from '@react-native-material/core';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';
import { sleep } from '../../commons/Constants';

type Person = {name: string, baseUrl: string};

const MediaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Base Url: {baseUrl}</Text>
      <ActivityIndicator color='teal' size='large' animating={loading} />
    </View>
    
  );
};

export default MediaScreen;