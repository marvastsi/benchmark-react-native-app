import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type ButtonProps = {
    onPress: any;
    title: string;
}

const FormButton = (props: ButtonProps) => {
    const { onPress, title } = props;
    return (
        <View style={styles.buttonView}>
            <TouchableOpacity
                style={styles.formButton}
                onPress={onPress}
            >
                <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonView: {
        marginHorizontal: 48,
        alignSelf: 'stretch',
    },
    formButton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 6,
        height: 40,
        marginTop: 50,
        backgroundColor: 'teal',
    },
    buttonText: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: '500',
        letterSpacing: 0.15,
        textTransform: 'capitalize',
        color: 'white',
    },
});

export default FormButton;