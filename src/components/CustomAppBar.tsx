import { AppBar, IconButton } from "@react-native-material/core";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import React, { useState } from 'react';
import Snackbar from 'react-native-snackbar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from "../styles";

const CustomAppBar = ({
    navigation,
    route,
    options,
    back,
}: NativeStackHeaderProps) => {
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    return (
        <AppBar style={styles.appBar}
            title={route.name}
            leading={props => {
                if (navigation.canGoBack()) {
                    return (
                        <IconButton
                            icon={props => <Icon name="arrow-left" {...props} />}
                            {...props}
                            onPress={() => {
                                if (navigation.canGoBack()) {
                                    navigation.pop();
                                }
                            }
                            }
                        />
                    )
                }
            }}
            trailing={props => (
                <IconButton
                    icon={props => <Icon name="dots-vertical" {...props} />}
                    {...props}
                    onPress={() => {
                        Snackbar.show({
                            text: 'Implement this',
                            duration: Snackbar.LENGTH_LONG,
                        });
                    }}
                />
            )}
        />
    );
}

export default CustomAppBar;