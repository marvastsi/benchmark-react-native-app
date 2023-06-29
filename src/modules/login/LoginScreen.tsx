import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import Snackbar from "react-native-snackbar";
import { sleep } from "../../commons/Constants";
import { saveToken } from "../../commons/CredentialStorage";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import HttpClient from "../../http/services/HttpClient";
import styles from "../../styles";
import { ExecutionParam } from "../execution/ExecutionScreen";


const LoginScreen = () => {
  const route = useRoute();
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();

  const { baseUrl } = route.params as ExecutionParam;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
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

    await sleep();
    if (navigation.canGoBack()) {
      // navigation.goBack();
      navigation.dispatch(popAction);
    }
  }

  return (
    <View style={styles.container}>
      <FormInput
        onChangeText={setUsername}
        value={username}
        placeholder="username"
      />
      <FormInput
        onChangeText={setPassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <FormButton
        title="Login"
        onPress={handleLogin}
      />
    </View>
  );
};


export default LoginScreen;