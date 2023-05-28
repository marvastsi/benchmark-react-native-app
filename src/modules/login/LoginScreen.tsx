import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import styles from '../../styles';
import InputFile from '../../components/ImputFile';

type Person = { name: string, baseUrl: string };

const LoginScreen = () => {
  const route = useRoute();
  const { name, baseUrl: baseUrl } = route.params as Person;

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [file, setFile] = React.useState('');

  const handleLogin = () => {
    Snackbar.show({
      text: `LOGIN: ${username || 'u'} : ${password || 'p'}`,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  return (
    <View style={styles.container}>
      <FormInput
        onChangeText={setUsername}
        value={username}
        placeholder='username'
      />
      <FormInput
        onChangeText={setPassword}
        value={password}
        placeholder='password'
        secureTextEntry={true}
      />
      <FormButton
        title='Login'
        onPress={handleLogin}
      />
    </View>
  );
};


export default LoginScreen;