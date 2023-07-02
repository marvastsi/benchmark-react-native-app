import { Text } from "@react-native-material/core";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Snackbar from "react-native-snackbar";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { CONFIG_ROUTE } from "../../routes";
import styles from "../../styles";
import { IExecution, ScenarioRoutes, TestExecution } from "./Excecutions";

const ExecutionScreen = () => {
  const navigation: NavigationProp<ReactNavigation.RootParamList> = useNavigation();
  const [route, setRoute] = useState<string>(CONFIG_ROUTE);
  const [buttonTitle, setButtonTitle] = useState("Start");
  const [showButton, setShowButton] = useState(true);
  const [label, setLabel] = useState("Click the button to Start");
  const [loaded, setLoaded] = useState(false);
  const [testExecution, setTestExecution] = useState<IExecution>(null);
  
  const onStart = useCallback(() => {
    if (!testExecution.isRunning()) {
      testExecution.start();
    }

    navigation.navigate(route);
  }, [route]);

  useEffect(() => {
    retrieveConfig()
      .then((config) => {

        console.log(`ExecutionScreen loaded: ${JSON.stringify(config)}`);

        setTestExecution(TestExecution.getIstance(config));

        if (testExecution.hasNext()) {
          const routeName = ScenarioRoutes.get(testExecution.next());
          setRoute(routeName);

          if (testExecution.isRunning()) {
            setLabel("Test Execution is Running");
          }
        } else {
          setLabel("Test Execution Finished!");
          setButtonTitle("Reconfigure");
          testExecution.stop();
          setRoute(CONFIG_ROUTE);
          setShowButton(false);
        }
        setLoaded(true);
      })
      .catch((error) => {
        console.error(`ExecutionScreen loading error: ${JSON.stringify(error)}`);
        console.error(`ExecutionScreen loading ERROR: ${error.message}`);
        Snackbar.show({
          text: `ExecutionScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
      });
  }, []);

  useEffect(() => {
    if (loaded && testExecution.isRunning()) {
      onStart();
    }
  }, [loaded])

  const StartButton = () => {
    return (
      <TouchableOpacity
        style={buttonStyles.formButton}
        onPress={onStart}
      >
        <Text style={buttonStyles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, {
      alignSelf: "stretch",
      alignItems: "center",
      justifyContent: "center",
    }]}>
      <Text style={{ marginVertical: 100 }}>{label}</Text>
      {showButton ? <StartButton /> : null}
    </View>
  );
};

export default ExecutionScreen;

const buttonStyles = StyleSheet.create({
  formButton: {
    alignSelf: "auto",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 6,
    height: 40,
    backgroundColor: "teal",
    zIndex: 0,
    paddingHorizontal: 24
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "500",
    letterSpacing: 0.15,
    textTransform: "capitalize",
    color: "white",
  },
});
