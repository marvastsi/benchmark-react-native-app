import { Text } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { types } from "react-native-document-picker";
import DropDownPicker from "react-native-dropdown-picker";
import Snackbar from "react-native-snackbar";
import { saveConfig } from "../../commons/ConfigStorage";
import requestPermission from "../../commons/Permissions";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import InputFile from "../../components/ImputFile";
import { Config } from "../../models/Config";
import { File } from "../../models/File";
import { EXECUTIONS_ROUTE } from "../../routes";
import styles from "../../styles";
import validateField from "../../commons/validator/Validator";
import { sleep } from "../../commons/Constants";

const ConfigScreen = () => {
  const navigation = useNavigation();

  const [testLoad, setTextLoad] = useState("");
  const [mediaFile, setMediaFile] = useState<File>({ name: "", uri: "" });
  const [uploadFile, setUploadFile] = useState<File>({ name: "", uri: "" });
  const [downloadFile, setDownloadFile] = useState("");
  const [serverUrl, setServerUrl] = useState("");
  const [scenario, setScenario] = useState(0);

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Select scenario", value: 0 },
    { label: "1 - Login API", value: 1 },
    { label: "2 - Account Form", value: 2 },
    { label: "3 - Download File", value: 3 },
    { label: "4 - Upload File", value: 4 },
    { label: "5 - Media Execution", value: 5 },
  ]);

  useEffect(() => {
    requestPermission()
      .then(() => {
        console.log(`Permissions Granted`);
      })
      .catch((error) => {
        console.error(`Permissions error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `Permissions error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }, []);

  const handleConfigSave = async () => {
    try {
      const config = {
        testLoad: parseInt(testLoad),
        mediaFile: { name: mediaFile.name, path: mediaFile.fileCopyUri },
        uploadFile: {
          uri: uploadFile.uri,
          fileCopyUri: uploadFile.fileCopyUri,
          name: uploadFile.name,
          type: uploadFile.type,
        },
        downloadFile,
        serverUrl,
        specificScenario: scenario,
      } as Config;

      await saveConfig(config);

      const strConfig = `Config Saved: ${JSON.stringify(config)}`;
      console.log(strConfig);

      Snackbar.show({
        text: `${strConfig}`,
        duration: Snackbar.LENGTH_LONG,
      });

    } catch (error) {
      const strError = `Config Save error: ${JSON.stringify(error)}`;
      console.error(strError);
      Snackbar.show({
        text: `${strError}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }

    await sleep(3000);

    navigation.navigate(EXECUTIONS_ROUTE);
  }

  /////// validations SATRT
  const [executionsError, setExecutionsError] = useState();
  const [donwaloadFileError, setDonwaloadFileError] = useState();
  const [serverUrlError, setServerUrlError] = useState();
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (donwaloadFileError || executionsError || serverUrlError) {
      console.log("not valid -> " + executionsError);
      setFormValid(false);
    } else {
      console.log("valid -> " + executionsError);
      setFormValid(true);
    }
  }, [executionsError, donwaloadFileError, serverUrlError]);
  /////// END validations

  return (
    <View style={styles.container}>
      <FormInput
        keyboardType="numeric"
        onChangeText={value => setTextLoad(value.trim())}
        onBlur={(event) => {
          setExecutionsError(validateField("executions", testLoad))
        }}
        error={executionsError}
        value={testLoad}
        placeholder="Executions"
      />
      <InputFile
        keyboardType="url"
        value={mediaFile.name}
        placeholder="Media file"
        setFile={setMediaFile}
        fileType={types.video}
      />
      <InputFile
        keyboardType="url"
        value={uploadFile.name}
        placeholder="Upload file"
        setFile={setUploadFile}
        fileType={types.allFiles}
      />
      <FormInput
        value={downloadFile}
        placeholder="Download file name"
        onChangeText={value => setDownloadFile(value.trim())}
        onBlur={(event) => {
          setDonwaloadFileError(validateField("downloadFile", downloadFile))
        }}
        error={donwaloadFileError}
      />
      <FormInput
        keyboardType="url"
        value={serverUrl}
        placeholder="Server URL"
        onChangeText={value => setServerUrl(value.trim())}
        onBlur={(event) => {
          setServerUrlError(validateField("serverUrl", serverUrl))
        }}
        error={serverUrlError}
      />
      <DropDownPicker
        listMode="SCROLLVIEW"
        style={configStyles.dropbox}
        multiple={false}
        open={open}
        setOpen={setOpen}
        dropDownContainerStyle={configStyles.dropboxContainer}
        items={items}
        setItems={setItems}
        value={scenario}
        setValue={setScenario}
        placeholder="Scenario"
        autoScroll={true}
        closeAfterSelecting={true}
        closeOnBackPressed={true}
        placeholderStyle={configStyles.dropboxPlaceholder}
      />
      <Text style={{ fontSize: 14 }}>
        If a specific scenario was selected, then only this
        scenario will be executed N times, where N = numberOfExecutions
      </Text>

      <FormButton
        title="Save Config"
        onPress={handleConfigSave}
        disabled={!formValid}
      />
    </View>
  );
};

const configStyles = StyleSheet.create({
  checksContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropbox: {
    paddingStart: 2,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "darkgrey",
    marginVertical: 10,
  },
  dropboxContainer: {
    borderWidth: 0,
    elevation: 3
  },
  dropboxPlaceholder: {
    color: "#9e9e9e",
    fontSize: 18,
  },
});

export default ConfigScreen;
