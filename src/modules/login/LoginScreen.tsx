import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Snackbar from "react-native-snackbar";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { sleep } from "../../commons/Constants";
import { saveToken } from "../../commons/CredentialStorage";
import { data } from "../../commons/data";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import HttpClient from "../../http/services/HttpClient";
import styles from "../../styles";

const LoginScreen = () => {
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();
  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [valueFilled, setValueFilled] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    retrieveConfig()
      .then((config) => {
        console.log(`LoginScreen loaded: ${JSON.stringify(config)}`);

        setBaseUrl(config.serverUrl);

        setLoaded(true);
      })
      .catch((error) => {
        console.error(`LoginScreen loading error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `LoginScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }, []);

  useEffect(() => {
    if (loaded) {
      setUsername(data.account.username);
      setPassword(data.account.password);
      setValueFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valueFilled) {
      handleLogin();
    }
  }, [valueFilled])

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
