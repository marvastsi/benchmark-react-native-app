import { useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import styles from '../../styles';

type Person = { name: string, baseUrl: string };

const DownloadScreen = () => {
  const route = useRoute();
  const { name, baseUrl: baseUrl } = route.params as Person;

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
      <FormButton
        title='Download'
        onPress={handlDownload}
      />
    </View>
  );
};

export default DownloadScreen;