import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Snackbar from "react-native-snackbar";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { sleep } from "../../commons/Constants";
import FormButton from "../../components/FormButton";
import FormInput from "../../components/FormInput";
import LabeledCheckbox from "../../components/LabeledCheckbox";
import LabeledSwitch from "../../components/LabeledSwitch";
import HttpClient from "../../http/services/HttpClient";
import styles from "../../styles";

const AccountScreen = () => {
  const navigation = useNavigation();
  const [baseUrl, setBaseUrl] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneCountryCode, setPhoneCountryCode] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [active, setActive] = React.useState(false);
  const [notification, setNotification] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    { label: "Select country-code", value: "" },
    { label: "+55 BRA", value: "+55" },
    { label: "+1 USA", value: "+1" }
  ]);

  useEffect(() => {
    retrieveConfig()
      .then((config) => {
        console.log(`AccountScreen loaded: ${JSON.stringify(config)}`);
        setBaseUrl(config.serverUrl);
      })
      .catch((error) => {
        console.error(`AccountScreen loading error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `AccountScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }, []);

  const saveAccount = async () => {
    try {
      const client = new HttpClient(baseUrl);
      const accountCreated = await client.saveAccount({
        firstName,
        lastName,
        email,
        phoneCountryCode,
        phoneNumber,
        active,
        notification,
        username,
        password,
      })

      Snackbar.show({
        text: `Account Saved: ${accountCreated.accountId}`,
        duration: Snackbar.LENGTH_LONG,
      });
    } catch (error) {

      Snackbar.show({
        text: `Account Create Error: ${JSON.stringify(error)}`,
        duration: Snackbar.LENGTH_LONG,
      });
    }

    await sleep();
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }

  return (
    <View style={styles.scroolContainer}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.scroolContent}
      >
        <FormInput
          onChangeText={setFirstName}
          value={firstName}
          placeholder="first name"
        />
        <FormInput
          onChangeText={setLastName}
          value={lastName}
          placeholder="last name"
        />
        <FormInput
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        />

        <DropDownPicker
          listMode="SCROLLVIEW"
          style={accountStyles.dropbox}
          multiple={false}
          open={open}
          setOpen={setOpen}
          dropDownContainerStyle={accountStyles.dropboxContainer}
          items={items}
          setItems={setItems}
          value={phoneCountryCode}
          setValue={setPhoneCountryCode}
          placeholder="phone country-code"
          autoScroll={true}
          closeAfterSelecting={true}
          closeOnBackPressed={true}
          placeholderStyle={accountStyles.dropboxPlaceholder}
        />
        <FormInput
          keyboardType="numeric"
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="phone"
        />
        <View style={accountStyles.checksContainer}>
          <LabeledSwitch
            style={{ alignItems: "flex-start" }}
            onValueChange={setActive}
            value={active}
          />
          <LabeledCheckbox
            style={{ alignItems: "flex-end" }}
            value={notification}
            onValueChange={setNotification}
          />
        </View>
        <FormInput
          onChangeText={setUsername}
          value={username}
          placeholder="username"
        />
        <FormInput
          onChangeText={setPassword}
          value={password}
          placeholder="password"
          secureTextEntry={true}
        />

        <FormButton
          title="Save"
          onPress={saveAccount}
        />
      </ScrollView>
    </View>
  );
};

const accountStyles = StyleSheet.create({
  checksContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropbox: {
    paddingStart: 2,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: "darkgrey",
    marginVertical: 10,
  },
  dropboxContainer: {
    borderWidth: 0,
    elevation: 3
  },
  dropboxPlaceholder: {
    color: "#9e9e9e",
    fontSize: 18,
  },
});

export default AccountScreen;