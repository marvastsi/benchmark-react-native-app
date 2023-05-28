import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles';

type Person = {name: string, baseUrl: string};

const MediaScreen = () => {
  const route = useRoute();
  const { name, baseUrl: baseUrl } = route.params as Person;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {name}</Text>
      <Text style={styles.field}>Base Url: {baseUrl}</Text>
    </View>
  );
};

export default MediaScreen;