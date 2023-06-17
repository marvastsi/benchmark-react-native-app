import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { sleep } from '../../commons/Constants';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';

const UploadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [file, setFile] = React.useState('');

  const handleUpload = async () => {
    try {
      Snackbar.show({
        text: `Implement this: Upload ${file || 'fileXXX'}`,
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (error) {
      Snackbar.show({
        text: `Upload Error: ${JSON.stringify(error)}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }

    await sleep();
  }

  return (
    <View style={styles.container}>
      <FormInput
        onChangeText={setFile}
        value={file}
        placeholder='upload file'
        secureTextEntry={true}
      />
      <FormButton
        title='Upload'
        onPress={handleUpload}
      />
    </View>
  );
};

export default UploadScreen;