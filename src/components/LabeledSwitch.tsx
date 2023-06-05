import { SwitchProps } from '@react-native-material/core';
import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

const LabeledSwitch = (props: SwitchProps) => {
    return (
        <View style={styles.switchContainer}>
            <Text style={styles.label}>Active</Text>
            <Switch
                {...props}
                style={styles.switch}
                trackColor={{ false: '#bdbdbd', true: '#81b0ff' }}//767577
                thumbColor={props.value ? 'teal' : '#ededed'}//f4f3f4
            />
        </View>
    );
};

const styles = StyleSheet.create({
    switchContainer: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginVertical: 10,
    },
    switch: {
        alignItems: 'flex-end',
    },
    label: {
        alignItems: 'flex-start',
        marginRight: 4,
        marginStart: 4,
        color: '#232123',
    },
});

export default LabeledSwitch;