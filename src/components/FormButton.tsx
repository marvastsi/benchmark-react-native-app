import { ActivityIndicator } from "@react-native-material/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ButtonProps = {
    onPress: any;
    title: string;
    disabled?: boolean | null | undefined;
}

const FormButton = (props: ButtonProps) => {
    const { onPress, title, disabled } = props;
    const [loading, setLoading] = React.useState(false);

    return (
        <View style={styles.buttonView}>
            <ActivityIndicator
                color="teal"
                size="large"
                animating={loading}
                style={[loading ? { zIndex: 1, marginBottom: -40 } : { zIndex: -1, marginBottom: -40 }]}
            />
            <TouchableOpacity
                style={[styles.formButton,
                (disabled || loading) ? { opacity: 0.5 } : { opacity: 1 }
                ]}
                onPress={async (event) => {
                    setLoading(true);
                    await onPress(event);
                    setLoading(false);
                }}
                disabled={disabled}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        marginTop: 50,
        marginHorizontal: 48,
        alignSelf: "stretch",
    },
    formButton: {
        alignSelf: "stretch",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
        elevation: 6,
        height: 40,
        backgroundColor: "teal",
        zIndex: 0,
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

export default FormButton;