import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';

type Person = { name: string, baseUrl: string };

const DownloadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [inProgress, setInProgress] = React.useState(false);
  
  const [filename, setFilename] = React.useState('');

  const handlDownload = () => {
    Snackbar.show({
      text: `Implement this: Download ${filename || 'fileXXX'}`,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  return (
    <View style={styles.container}>
      <FormInput
        onChangeText={setFilename}
        value={filename}
        placeholder='download file'
        secureTextEntry={true}
      />
      <ProgressBar
          indeterminate={true}
          styleAttr='Large'
          animating={inProgress}
        />
      <FormButton
        title='Download'
        onPress={handlDownload}
      />
    </View>
  );
};

export default DownloadScreen;