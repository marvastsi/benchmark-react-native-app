import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Snackbar from "react-native-snackbar";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { sleep } from "../../commons/Constants";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import HttpClient from "../../http/services/HttpClient";
import styles from "../../styles";

const DownloadScreen = () => {
  const navigation = useNavigation();
  const [baseUrl, setBaseUrl] = useState("");
  const [loaded, setLoaded] = useState(false);

  const [filename, setFilename] = useState("");

  useEffect(() => {
    retrieveConfig()
      .then((config) => {
        console.log(`DownloadScreen loaded: ${JSON.stringify(config)}`);

        setFilename(config.downloadFile);
        setBaseUrl(config.serverUrl);

        setLoaded(true);
      })
      .catch((error) => {
        console.error(`DownloadScreen loading error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `DownloadScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }, []);

  useEffect(() => {
    if (loaded) {
      handlDownload();
    }
  }, [loaded])

  const handlDownload = async () => {
    try {
      const client = new HttpClient(baseUrl);
      const result = await client.download(filename);

      if (result) {
        Snackbar.show({
          text: `Download Success: ${JSON.stringify(result)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      console.error(`Download error: ${JSON.stringify(error)}`);
      Snackbar.show({
        text: `Download Error: ${JSON.stringify(error)}`,
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
        onChangeText={setFilename}
        value={filename}
        placeholder="download file"
      />

      <FormButton
        title="Download"
        onPress={handlDownload}
      />
    </View>
  );
};

export default DownloadScreen;
