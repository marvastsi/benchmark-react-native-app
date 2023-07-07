import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Snackbar from "react-native-snackbar";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { sleep } from "../../commons/Constants";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import HttpClient from "../../http/services/HttpClient";
import styles from "../../styles";
import validateField from "../../commons/validator/Validator";
import { HttpException } from "../../http/errors/HttpException";

const DownloadScreen = () => {
  const navigation = useNavigation();
  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [fileName, setFileName] = useState("");

  useFocusEffect(useCallback(() => {
    setLoaded(false);
    loadConfig();
  }, []));

  useEffect(() => {
    if (loaded) {
      // setFilename("file.png");
      setValuesFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valuesFilled) {
      setValuesFilled(false);
      handlDownload();
    }
  }, [valuesFilled])

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
        setFileName(config.downloadFile);
        setBaseUrl(config.serverUrl);
        setLoaded(true);
      })
      .catch((error) => {
        Snackbar.show({
          text: `DownloadScreen loading error: ${error.message}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  const handlDownload = async () => {
    try {
      const client = new HttpClient(baseUrl);
      const result = await client.download(fileName);

      if (result) {
        Snackbar.show({
          text: `Download Executed: ${result.toString()}`,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      let err = error as HttpException;
      Snackbar.show({
        text: `${err.status}: Download failed`,
        duration: Snackbar.LENGTH_LONG,
      });
    }

    await sleep();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  /////// validations SATRT
  const [fileNameError, setFileNameError] = useState();

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (fileNameError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [fileNameError]);
  /////// END validations

  return (
    <View style={styles.container}>
      <FormInput
        value={fileName}
        placeholder="download file"
        onChangeText={value => setFileName(value.trim())}
        onBlur={(event) => {
          setFileNameError(validateField("downloadFile", fileName))
        }}
        error={fileNameError}
      />

      <FormButton
        title="Download"
        onPress={handlDownload}
        disabled={!formValid}
      />
    </View>
  );
};

export default DownloadScreen;
