import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

export interface FormInputProps extends TextInputProps {
    error?: string;
}

const FormInput = (props: FormInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <View style={styles.base}>
            <TextInput
                {...props}
                style={[styles.textInput,
                !props.error ?
                    isFocused ? styles.inputFocus : styles.inputBlur
                    : styles.inputError
                ]}
                placeholderTextColor="#9e9e9e"
                autoComplete="off"
                onFocus={(event) => {
                    if (props.onFocus) {
                        props.onFocus(event);
                    }
                    handleFocus();
                }}
                onBlur={(event) => {
                    if (props.onBlur) {
                        props.onBlur(event);
                    }
                    handleBlur();
                }}
            />
            {props.error && <Text style={{ color: "red" }}>{props.error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    base: {
        alignItems: "center",
        alignSelf: "stretch",
    },
    textInput: {
        height: 46,
        alignSelf: "stretch",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "darkgrey",
        marginVertical: 10,
        fontSize: 18,
        alignItems: "flex-start",
    },
    inputFocus: { borderBottomWidth: 2, borderBottomColor: "teal" },
    inputBlur: { borderBottomWidth: 1, borderBottomColor: "darkgrey", },
    inputError: { borderBottomWidth: 1, borderBottomColor: "red", },
});

export default FormInput;