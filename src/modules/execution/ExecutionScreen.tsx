import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { View } from "react-native";
import FormButton from "../../components/FormButton";
import { retrieveConfig } from "../../commons/ConfigStorage";
import Snackbar from "react-native-snackbar";

const ExecutionScreen = () => {
  const navigation = useNavigation();
  

  useEffect(() => {
    retrieveConfig()
      .then((config) => {
        console.log(`ExecutionScreen loaded: ${JSON.stringify(config)}`);
      // TODO execution code here
      })
      .catch((error) => {
        console.error(`ExecutionScreen loading error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `ExecutionScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }, []);

  const renderComponent = () => {
    return (
      <FormButton
        title="Save"
        onPress={() => navigation.navigate("Media")}
      />
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 10 }}>
      {renderComponent()}
    </View>
  );
};

export default ExecutionScreen;