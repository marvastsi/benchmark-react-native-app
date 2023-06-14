import { ProgressBar } from '@react-native-community/progress-bar-android';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { saveToken } from '../../commons/CredentialStorage';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import HttpClient from '../../http/services/HttpClient';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';
import { ActivityIndicator } from '@react-native-material/core';
import { LENGTH_MEDIUM } from '../../commons/Constants';


const LoginScreen = () => {
  const route = useRoute();
  const [loading, setLoading] = React.useState(false);

  // const { serverUrl } = route.params as Config;
  const { baseUrl } = route.params as ExecutionParam;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const client = new HttpClient(baseUrl);
      const token = await client.login({ username, password });
        if (token) {
          saveToken(token);
          Snackbar.show({
            text: `Login Success: ${JSON.stringify(token)}`,
            duration: Snackbar.LENGTH_LONG,
          });
        }
    } catch (error) {
        Snackbar.show({
          text: `Login Error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
    }

    setTimeout(() => {
        setLoading(false);
    }, LENGTH_MEDIUM)
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
      <ActivityIndicator color='teal' size='large' animating={loading} />
      <FormButton
        title='Login'
        onPress={handleLogin}
      />
    </View>
  );
};


export default LoginScreen;