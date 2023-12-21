import { IconButton } from "@react-native-material/core";
import React, { Dispatch, useCallback } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import DocumentPicker, { DocumentPickerResponse } from "react-native-document-picker";
import Snackbar from "react-native-snackbar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { File } from "../models/File";

export interface InputFileProps extends TextInputProps {
    fileType?: string | string[]
    setFile: Dispatch<File>;
}

const InputFile = (props: InputFileProps) => {
    const { fileType, setFile } = props;

    const logFilePicked = (res: DocumentPickerResponse) => {
        console.log("res : " + JSON.stringify(res));
    };

    const handleFileError = (err: any) => {
        if (DocumentPicker.isCancel(err)) {
            Snackbar.show({
                text: "Canceled",
                duration: Snackbar.LENGTH_LONG,
            });
        } else {
            Snackbar.show({
                text: "Unknown Error: " + JSON.stringify(err),
                duration: Snackbar.LENGTH_LONG,
            });
            throw err;
        }
    };

    const onSelectFile = useCallback(async () => {
        try {
            const res = await DocumentPicker.pickSingle({
                type: fileType,
                copyTo: "cachesDirectory"
            });
            logFilePicked(res);

            setFile({ ...res });

        } catch (err) {
            handleFileError(err);
        }
    }, [setFile]);

    return (
        <View style={styles.fileInputView}>
            <TextInput
                {...props as TextInputProps}
                style={styles.textInput}
                placeholderTextColor="#9e9e9e"
                autoComplete="off"
                editable={false}
            />
            <IconButton
                style={styles.iconButton}
                icon={props => <Icon style={{ color: "white" }} name="folder" {...props} />}
                onPress={onSelectFile}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    fileInputView: {
        height: 46,
        alignSelf: "stretch",
        backgroundColor: "white",
        marginVertical: 10,
        fontSize: 18,
        alignItems: "flex-start",
        flexDirection: "row",
    },
    textInput: {
        height: 46,
        width: "83%",
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "darkgrey",
        borderRadius: 6,
        marginEnd: 4,
        fontSize: 18,
        alignItems: "flex-start",
    },
    iconButton: {
        height: 40,
        width: "15%",
        alignSelf: "flex-end",
        backgroundColor: "teal",
        borderRadius: 4,
        marginLeft: 2,
        alignItems: "stretch",
    },
});

export default InputFile;