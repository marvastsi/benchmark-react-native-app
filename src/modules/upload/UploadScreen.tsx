import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import styles from '../../styles';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';

const UploadScreen = () => {
  const route = useRoute();
  const { serverUrl } = route.params as Config;

  const [file, setFile] = React.useState('');

  const handleUpload = () => {
    Snackbar.show({
      text: `Implement this: Upload ${file || 'fileXXX'}`,
      duration: Snackbar.LENGTH_LONG,
    });
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