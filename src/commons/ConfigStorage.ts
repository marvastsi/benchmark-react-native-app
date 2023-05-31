import AsyncStorage from "@react-native-async-storage/async-storage";

const saveConfig = async (config: Config) => {
  try {
    await AsyncStorage.setItem(
      APP_CONFIG,
      JSON.stringify(config),
    );
  } catch (error) {
    console.log(`Error: Saving APP_CONFIG`);
  }
};

const retrieveConfig = async (): Promise<Config> => {
  try {
    const value = await AsyncStorage.getItem(APP_CONFIG);
    if (value !== null) {
      console.log(`APP_CONFIG: ${value}`);
    }
    return JSON.parse(value) as Config;
  } catch (error) {
    console.log(`Error: Retrieving APP_CONFIG`);
  }
};

const APP_CONFIG = "APP_CONFIG";

export { saveConfig, retrieveConfig };