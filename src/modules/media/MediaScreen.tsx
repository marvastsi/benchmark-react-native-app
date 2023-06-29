import { ActivityIndicator } from "@react-native-material/core";
import { StackActions, useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Text, View } from "react-native";
import styles from "../../styles";
import MediaPlayer from "../../components/media-player/MediaPlayer";
import { ExecutionParam } from "../execution/ExecutionScreen";
import { LENGTH_SHORT, sleep } from "../../commons/Constants";


const MediaScreen = () => {
  const route = useRoute();
  const popAction = StackActions.pop(1);
  const navigation = useNavigation();
  const { baseUrl } = route.params as ExecutionParam;

  const [loading, setLoading] = React.useState(false);

  const onStop = async () => {
    await sleep(LENGTH_SHORT);
    if (navigation.canGoBack()) {
      // navigation.goBack();
      navigation.dispatch(popAction);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.field}>Base Url: {baseUrl}</Text>
      <ActivityIndicator color="teal" size="large" animating={loading} />
      <MediaPlayer
        onStop={onStop}
      />
    </View>

  );
};

export default MediaScreen;