import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
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
  const navigation = useNavigation();
  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useFocusEffect(useCallback(() => {
    setLoaded(false);
    loadConfig();
  }, []));

  useEffect(() => {
    if (loaded) {
      setUsername(data.account.username);
      setPassword(data.account.password);
      setValuesFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valuesFilled) {
      setValuesFilled(false);
      handleLogin();
    }
  }, [valuesFilled])

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
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
  }

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
      console.error(`Login Error: ${error.message} => ${JSON.stringify(error)}`);
      Snackbar.show({
        text: `Login Error: ${JSON.stringify(error)}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }

    await sleep();
    if (navigation.canGoBack()) {
      navigation.goBack();
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
