import { Text } from '@react-native-material/core';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import InputFile from '../../components/ImputFile';
import styles from '../../styles';

const ConfigScreen = () => {
  const navigation = useNavigation();
  
  const [inProgress, setInProgress] = React.useState(false);
  
  const [testLoad, setTextLoad] = React.useState('');
  const [mediaFile, setMediaFile] = React.useState('');
  const [uploadFile, setUploadFile] = React.useState('');
  const [downloadFile, setDownloadFile] = React.useState('');
  const [serverUrl, setServerUrl] = React.useState('');
  const [scenario, setScenario] = React.useState(0);

  const handleLogin = () => {
    Snackbar.show({
      text: `implement this: Save Config`,
      duration: Snackbar.LENGTH_LONG,
    });
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
      <Text style={{ fontSize: 14 }}>
        If a specific scenario was selected, then only this scenario will be executed N times, where N = numberOfExecutions
      </Text>
      <ProgressBar
          indeterminate={true}
          styleAttr='Large'
          animating={inProgress}
        />
      <FormButton
        title='Save Config'
        onPress={handleLogin}
      />
    </View>
  );
};

export default ConfigScreen;