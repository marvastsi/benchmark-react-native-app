import { useNavigation, useRoute, StackActions } from "@react-navigation/native";
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
import { ExecutionParam } from "../execution/ExecutionScreen";

const UploadScreen = () => {
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;
  const [uploadFile, setUploadFile] = useState<FileUpload>({
    name: "",
    uri: null,
    type: null,
  });

  useEffect(() => {
    retrieveConfig()
      .then((config) => {
        console.log(`Data loaded: ${JSON.stringify(config)}`);
        setUploadFile(config.uploadFile);
      })
      .catch((error) => {
        console.error(`Data loading error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `Data loading error: ${JSON.stringify(error)}`,
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
      console.error(`Data loading error: ${JSON.stringify(error)}`);
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