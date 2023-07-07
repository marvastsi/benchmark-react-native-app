import AsyncStorage from "@react-native-async-storage/async-storage";
import { Token } from "../models/Credentials";

const saveToken = async (token: Token) => {
    try {
        await AsyncStorage.setItem(
            API_TOKEN,
            token.value
        );
    } catch (error) {
        console.log(`Error: Saving API_TOKEN`);
    }
};

const retrieveToken = async (): Promise<Token> => {
    try {
        const value = await AsyncStorage.getItem(API_TOKEN);
        if (value !== null) {
            console.log(`API_TOKEN: ${value}`);
        }
        return { type: "Bearer", value } as Token;
    } catch (error) {
        console.log(`Error: Retrieving API_TOKEN`);
    }
};

const API_TOKEN = "API_TOKEN";

export { retrieveToken, saveToken };

