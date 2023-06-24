import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, View } from 'react-native';
import fs from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import { sleep } from '../../commons/Constants';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import InputFile from '../../components/ImputFile';
import HttpClient from '../../http/services/HttpClient';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';
import { DocumentPickerResponse, types } from 'react-native-document-picker';

const UploadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [fileName, setFileName] = React.useState('');
  const [fileData, setFileData] = React.useState('');

  const handleUpload = async () => {
    try {
      setFileName(uploadFile.name);
      const data = await fs.readFile(`${uploadFile.fileCopyUri}`, 'base64');
      setFileData(data);
      
      const client = new HttpClient(baseUrl);
      const result = await client.upload(uploadFile);

      if (result) {
        Snackbar.show({
          text: `Upload Success: ${JSON.stringify(result)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      }
    } catch (error) {
      Snackbar.show({
        text: `Upload Error: ${JSON.stringify(error)}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }

    await sleep();
  }
  const [uploadFile, setUploadFile] = useState<DocumentPickerResponse>({
    name: '', uri: null,
    copyError: null,
    fileCopyUri: null,
    type: null,
    size: null
  });

  return (
    <View style={styles.container}>
      <InputFile
        keyboardType='url'
        value={uploadFile.name}
        placeholder='Upload file'
        setFile={setUploadFile}
        fileType={types.allFiles}
      />
      <Image 
        style={{
          width: 100,
          height: 150,
        }}
        source={{uri: `data:${uploadFile.type};base64,${fileData}`}}
       />
      <FormInput
        onChangeText={setFileName}
        value={fileName}
        placeholder='upload file'
      />
      <FormButton
        title='Upload'
        onPress={handleUpload}
      />
    </View>
  );
};

export default UploadScreen;