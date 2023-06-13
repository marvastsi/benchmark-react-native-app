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


const LoginScreen = () => {
  const route = useRoute();
  const [inProgress, setInProgress] = React.useState(false);

  // const { serverUrl } = route.params as Config;
  const { baseUrl } = route.params as ExecutionParam;
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async () => {
    setInProgress(true);

    const client = new HttpClient(baseUrl);
    const token = await client.login({ username, password })

    saveToken(token);

    setTimeout(() => {
      Snackbar.show({
        text: `Login => ${JSON.stringify(token)}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }, 3000);

    setInProgress(false);
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
      <ProgressBar
        indeterminate={true}
        styleAttr='Large'
        animating={inProgress}
      />
      <FormButton
        title='Login'
        onPress={handleLogin}
      />
    </View>
  );
};


export default LoginScreen;