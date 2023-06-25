import CheckBox, { CheckBoxProps } from "@react-native-community/checkbox";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const LabeledCheckbox = (props: CheckBoxProps) => {
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                {...props}
                style={styles.checkbox}
                tintColor="teal"
            />
            <Text style={styles.label}>Notifications</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginVertical: 10,
    },
    checkbox: {
        alignItems: "flex-start",
    },
    label: {
        alignItems: "flex-end",
        marginEnd: 4,
        marginLeft: 4,
        color: "#232123",
    },
});

export default LabeledCheckbox;