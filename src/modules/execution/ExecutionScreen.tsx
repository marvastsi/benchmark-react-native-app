import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    id: 1,
    name: 'Login',
    baseUrl: 'http://192.168.100.115:3000/api',
  },
  {
    id: 2,
    name: 'Account',
    baseUrl: 'http://192.168.100.115:3000/api',
  },
  {
    id: 3,
    name: 'Download',
    baseUrl: 'http://192.168.100.115:3000/api',
  },
  {
    id: 4,
    name: 'Upload',
    baseUrl: 'http://192.168.100.115:3000/api',
  },
  {
    id: 5,
    name: 'Media',
    baseUrl: 'http://192.168.100.115:3000/api',
  },
  {
    id: 6,
    name: 'AppConfig',
    baseUrl: 'http://192.168.100.115:3000/api',
  },
];

export type ExecutionParam = { id: number, name: string, baseUrl: string };

const ExecutionScreen = () => {
  const navigation = useNavigation();
  const renderListItems = ({ item }: { item: ExecutionParam }) => {
    return (
      <Pressable
        onPress={() => navigation.navigate(item.name, item)
        }
      >
        <Text
          style={{ fontSize: 18, paddingHorizontal: 12, paddingVertical: 12 }}
        >
          {item.name}
        </Text>
        <View
          style={{
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#ccc',
          }}
        />
      </Pressable>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      <FlatList data={DATA} renderItem={renderListItems} />
    </View>
  );
};

export default ExecutionScreen;