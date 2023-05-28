import { IconButton } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const InputFile = (props: TextInputProps) => {

    return (
        <View style={styles.fileInputView}>
            <TextInput
                {...props}
                style={styles.textInput}
                placeholderTextColor='#9e9e9e'
                autoComplete='off'
                editable={false}
            />
            <IconButton
            style={styles.iconButton}
                icon={props => <Icon style={{color: 'white'}} name="folder" {...props} />}
                onPress={() => {
                    Snackbar.show({
                        text: 'Implement this to open files',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fileInputView: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: 'white',
        marginVertical: 10,
        fontSize: 18,
        alignItems: 'flex-start',
        flexDirection:'row'
    },
    textInput: {
        height: 46,
        width: '83%',
        alignSelf: 'flex-start',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'darkgrey',
        borderRadius: 6,
        marginEnd: 4,
        fontSize: 18,
        alignItems: 'flex-start',
    },
    iconButton: {
        height: 40,
        width: '15%',
        alignSelf: 'flex-end',
        backgroundColor: 'teal',
        borderRadius: 4,
        marginLeft: 2,
        alignItems: 'stretch',
    },
});

export default InputFile;