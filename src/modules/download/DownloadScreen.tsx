import { ActivityIndicator } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { sleep } from '../../commons/Constants';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import styles from '../../styles';
import { ExecutionParam } from '../execution/ExecutionScreen';

type Person = { name: string, baseUrl: string };

const DownloadScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { baseUrl } = route.params as ExecutionParam;

  const [loading, setLoading] = React.useState(false);

  const [filename, setFilename] = React.useState('');

  const handlDownload = async () => {
    setLoading(true);
    try {
      Snackbar.show({
        text: `Implement this: Download ${filename || 'fileXXX'}`,
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (error) {
      Snackbar.show({
        text: `Download Error: ${JSON.stringify(error)}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }

    await sleep();
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <FormInput
        onChangeText={setFilename}
        value={filename}
        placeholder='download file'
        secureTextEntry={true}
      />
      <ActivityIndicator color='teal' size='large' animating={loading} />
      <FormButton
        title='Download'
        onPress={handlDownload}
      />
    </View>
  );
};

export default DownloadScreen;