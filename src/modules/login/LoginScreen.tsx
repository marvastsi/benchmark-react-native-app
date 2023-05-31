import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import HttpClient from '../../http/services/HttpClient';
import styles from '../../styles';
import { saveToken } from '../../commons/CredentialStorage';

const LoginScreen = () => {
  const route = useRoute();
  const { serverUrl } = route.params as Config;

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleLogin = async () => {
    const client = new HttpClient(serverUrl);
    const token = await client.login({ username, password })

    saveToken(token);

    Snackbar.show({
      text: `Login => ${token}`,
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