import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Snackbar from "react-native-snackbar";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { sleep } from "../../commons/Constants";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import HttpClient from "../../http/services/HttpClient";
import { FileUpload } from "../../models/FileUpload";
import styles from "../../styles";

const UploadScreen = () => {
  const navigation = useNavigation();
  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [valuesFilled, setValuesFilled] = useState(false);

  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState<FileUpload>({
    name: "",
    uri: null,
    type: null,
  });

  useFocusEffect(useCallback(() => {
    setLoaded(false);
    loadConfig();
  }, []));

  useEffect(() => {
    if (loaded) {
      setFileName(uploadFile.name);
      setValuesFilled(true);
    }
  }, [loaded])

  useEffect(() => {
    if (valuesFilled) {
      setValuesFilled(false);
      handleUpload();
    }
  }, [valuesFilled])

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
        setUploadFile(config.uploadFile);
        setBaseUrl(config.serverUrl);
        setLoaded(true);
      })
      .catch((error) => {
        console.error(`UploadScreen loading error: ${error.message} => ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `UploadScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  };

  const handleUpload = async () => {
    try {
      const client = new HttpClient(baseUrl);
      const result = await client.upload(uploadFile);

      if (result) {
        Snackbar.show({
          text: `Upload Success: ${JSON.stringify(result)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      console.error(`Upload error: ${error.message} => ${JSON.stringify(error)}`);
      Snackbar.show({
        text: `Upload Error: ${JSON.stringify(error)}`,
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
        onChangeText={setFileName}
        value={fileName}
        placeholder="upload file"
      />
      <FormButton
        title="Upload"
        onPress={handleUpload}
      />
    </View>
  );
};

export default UploadScreen;
