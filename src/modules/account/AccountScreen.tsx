import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import styles from '../../styles';

type Person = {name: string, baseUrl: string};

const AccountScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, baseUrl: baseUrl } = route.params as Person;


  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [countryCode, setCountryCode] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [active, setActive] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleSaveAccount = () => {
    Snackbar.show({
      text: `implement this: Save Account`,
      duration: Snackbar.LENGTH_LONG,
    });
  }

  return (
    <View style={styles.container}>
      <FormInput
        onChangeText={setFirstName}
        value={firstName}
        placeholder='first name'
      />
      <FormInput
        onChangeText={setLastName}
        value={lastName}
        placeholder='last name'
      />
      <FormInput
        onChangeText={setEmail}
        value={email}
        placeholder='email'
      />
      <FormInput
        keyboardType='numeric'
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder='phone'
      />
      {/*
       // country_code -> comboBox/dropBox/Select/Spinner
       // active -> switch
       // notification -> checkBox  */}
      <FormInput
        onChangeText={setUsername}
        value={username}
        placeholder='username'
      />
      <FormInput
        onChangeText={setPassword}
        value={password}
        placeholder='password'
        secureTextEntry={true}
      />
      <FormButton
        title='Save'
        onPress={handleSaveAccount}
      />
    </View>
  );
};

export default AccountScreen;