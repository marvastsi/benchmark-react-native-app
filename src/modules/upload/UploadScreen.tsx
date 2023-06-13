import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import styles from '../../styles';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { ExecutionParam } from '../execution/ExecutionScreen';

const UploadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [inProgress, setInProgress] = React.useState(false);

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
      <ProgressBar
          indeterminate={true}
          styleAttr='Large'
          animating={inProgress}
        />
      <FormButton
        title='Upload'
        onPress={handleUpload}
      />
    </View>
  );
};

export default UploadScreen;