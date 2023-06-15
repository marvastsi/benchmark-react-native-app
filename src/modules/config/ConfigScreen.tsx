import { ActivityIndicator, Text } from '@react-native-material/core';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import InputFile from '../../components/ImputFile';
import styles from '../../styles';

const ConfigScreen = () => {
  const navigation = useNavigation();

  const [loading, setLoading] = React.useState(false);

  const [testLoad, setTextLoad] = React.useState('');
  const [mediaFile, setMediaFile] = React.useState('');
  const [uploadFile, setUploadFile] = React.useState('');
  const [downloadFile, setDownloadFile] = React.useState('');
  const [serverUrl, setServerUrl] = React.useState('');
  const [scenario, setScenario] = React.useState(0);

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    { label: 'Select scenario', value: 0 },
    { label: '1 - Login API', value: 1 },
    { label: '2 - Account Form', value: 2 },
    { label: '3 - Download File', value: 3 },
    { label: '4 - Upload File', value: 4 },
    { label: '5 - Media Execution', value: 5 },
  ]);

  const saveConfig = async () => {
    setLoading(true);
    Snackbar.show({
      text: `Implement this: Save Config`,
      duration: Snackbar.LENGTH_LONG,
    });

    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <FormInput
        keyboardType='numeric'
        onChangeText={setTextLoad}
        value={testLoad}
        placeholder='Executions'
      />
      <InputFile
        keyboardType='url'
        value={mediaFile}
        onChangeText={setMediaFile}
        placeholder='Media file' />
      <InputFile
        keyboardType='url'
        value={uploadFile}
        onChangeText={setUploadFile}
        placeholder='Upload file' />
      <FormInput
        onChangeText={setDownloadFile}
        value={downloadFile}
        placeholder='Download file name'
      />
      <FormInput
        keyboardType='url'
        onChangeText={setServerUrl}
        value={serverUrl}
        placeholder='Server URL'
      />
      <DropDownPicker
        listMode='SCROLLVIEW'
        style={configStyles.dropbox}
        multiple={false}
        open={open}
        setOpen={setOpen}
        dropDownContainerStyle={configStyles.dropboxContainer}
        items={items}
        setItems={setItems}
        value={scenario}
        setValue={setScenario}
        placeholder='Scenario'
        autoScroll={true}
        closeAfterSelecting={true}
        closeOnBackPressed={true}
        placeholderStyle={configStyles.dropboxPlaceholder}
      />
      <Text style={{ fontSize: 14 }}>
        If a specific scenario was selected, then only this
        scenario will be executed N times, where N = numberOfExecutions
      </Text>
      <ActivityIndicator color='teal' size='large' animating={loading} />
      <FormButton
        title='Save Config'
        onPress={saveConfig}
      />
    </View>
  );
};

const configStyles = StyleSheet.create({
  checksContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropbox: {
    paddingStart: 2,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgrey',
    marginVertical: 10,
  },
  dropboxContainer: {
    borderWidth: 0,
    elevation: 3
  },
  dropboxPlaceholder: {
    color: '#9e9e9e',
    fontSize: 18,
  },
});

export default ConfigScreen;