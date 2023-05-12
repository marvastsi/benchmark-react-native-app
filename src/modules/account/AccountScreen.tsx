import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';

type Person = {name: string, baseUrl: string};

const AccountScreen = () => {
  const route = useRoute();
  const { name, baseUrl: baseUrl } = route.params as Person;

  return (
    <View style={{ flex: 1, paddingTop: 12, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 18, paddingBottom: 12 }}>Name: {name}</Text>
      <Text style={{ fontSize: 18 }}>Base Url: {baseUrl}</Text>
    </View>
  );
};

export default AccountScreen;