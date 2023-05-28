import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from '../../styles';

type Person = {name: string, baseUrl: string};

const UploadScreen = () => {
  const route = useRoute();
  const { name, baseUrl: baseUrl } = route.params as Person;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name: {name}</Text>
      <Text style={styles.field}>Base Url: {baseUrl}</Text>
    </View>
  );
};

export default UploadScreen;