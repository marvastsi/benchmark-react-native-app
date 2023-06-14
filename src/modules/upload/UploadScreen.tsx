import { ActivityIndicator } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';
import { sleep } from '../../commons/Constants';

const UploadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [loading, setLoading] = React.useState(false);

  const [file, setFile] = React.useState('');

  const handleUpload = async () => {
    setLoading(true);
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
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <FormInput
        onChangeText={setFile}
        value={file}
        placeholder='upload file'
        secureTextEntry={true}
      />
      <ActivityIndicator color='teal' size='large' animating={loading} />
      <FormButton
        title='Upload'
        onPress={handleUpload}
      />
    </View>
  );
};

export default UploadScreen;