import { ActivityIndicator } from '@react-native-material/core';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Snackbar from 'react-native-snackbar';
import FormButton from '../../components/FormButton';
import FormInput from '../../components/FormInput';
import LabeledCheckbox from '../../components/LabeledCheckbox';
import LabeledSwitch from '../../components/LabeledSwitch';
import styles from '../../styles';

type Person = { name: string, baseUrl: string };

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

  const [inProgress, setInProgress] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    { label: '+55 BRA', value: '+55' },
    { label: '+1 USA', value: '+1' }
  ]);


  const handleSaveAccount = () => {
    setInProgress(true);
    setTimeout(() => {
      Snackbar.show({
        text: `implement this: Save Account`,
        duration: Snackbar.LENGTH_LONG,
      });
    }, 3000);

    setInProgress(false);
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
      <DropDownPicker
        multiple={false}
        open={open}
        setOpen={setOpen}
        containerStyle={{ height: 40 }}
        items={items}
        setItems={setItems}
        value={countryCode}
        setValue={setCountryCode}
        placeholder='Phone Country Code'
        placeholderStyle={{color: '#9e9e9e'}}
      />
      <FormInput
        keyboardType='numeric'
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder='phone'
      />
      <View style={{ alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between', }}>
        <LabeledSwitch
          style={{ alignItems: 'flex-start' }}
          onValueChange={setActive}
          value={active}
        />
        <LabeledCheckbox
          style={{ alignItems: 'flex-end' }}
          value={notification}
          onValueChange={setNotification}
        />
      </View>

      {/* country_code -> comboBox/dropBox/Select/Spinner*/}
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
      <ActivityIndicator color='teal' animating={inProgress} />

    </View>
  );
};

export default AccountScreen;