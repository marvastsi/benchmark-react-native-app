import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const DATA = [
  {
    id: 1,
    name: 'Login',
    base_url: 'http://localhost:3000/api',
  },
  {
    id: 2,
    name: 'Account',
    base_url: 'http://localhost:3000/api',
  },
  {
    id: 3,
    name: 'Download',
    base_url: 'http://localhost:3000/api',
  },
  {
    id: 4,
    name: 'Upload',
    base_url: 'http://localhost:3000/api',
  },
  {
    id: 5,
    name: 'Media',
    base_url: 'http://localhost:3000/api',
  },
  {
    id: 6,
    name: 'AppConfig',
    base_url: 'http://localhost:3000/api',
  },
];

type Person = {id: number, name: string, base_url: string};

const ExecutionScreen = () => {
const navigation = useNavigation();
  const renderListItems = ({ item }: {item: Person}) => {
    return (
      <Pressable
        onPress={() =>
          navigation.navigate(`${item.name}`, {
            name: item.name,
            baseUrl: item.base_url,
          })
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