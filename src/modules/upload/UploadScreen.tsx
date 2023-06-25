import { StackActions, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();
  const [baseUrl, setBaseUrl] = useState("");
  const [uploadFile, setUploadFile] = useState<FileUpload>({
    name: "",
    uri: null,
    type: null,
  });

  useEffect(() => {
    retrieveConfig()
      .then((config) => {
        console.log(`UploadScreen loaded: ${JSON.stringify(config)}`);
        setUploadFile(config.uploadFile);
        setBaseUrl(config.serverUrl);
      })
      .catch((error) => {
        console.error(`UploadScreen loading error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `UploadScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }, []);

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
      console.error(`Upload error: ${JSON.stringify(error)}`);
      Snackbar.show({
        text: `Upload Error: ${JSON.stringify(error)}`,
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
        onChangeText={(text) => { }}
        value={uploadFile.name}
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