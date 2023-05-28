import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

const FormInput = (props: TextInputProps) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    return (
        <TextInput
            {...props}
            style={[styles.textInput, isFocused ?
                { borderBottomWidth: 2, borderBottomColor: 'teal' }
                : { borderBottomWidth: 1, borderBottomColor: 'darkgrey', }]}
            placeholderTextColor='#9e9e9e'
            autoComplete='off'
            onFocus={handleFocus}
            onBlur={handleBlur}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgrey',
        borderRadius: 6,
        marginVertical: 10,
        fontSize: 18,
        alignItems: 'flex-start',
    },
});

export default FormInput;