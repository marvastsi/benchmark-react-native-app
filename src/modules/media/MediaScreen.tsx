import { ActivityIndicator } from "@react-native-material/core";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import Snackbar from "react-native-snackbar";
import { retrieveConfig } from "../../commons/ConfigStorage";
import { LENGTH_SHORT, sleep } from "../../commons/Constants";
import MediaPlayer from "../../components/media-player/MediaPlayer";
import { MediaFile } from "../../models/MediaFile";
import styles from "../../styles";

const MediaScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [mediaFile, setMediaFile] = useState<MediaFile>({ name: "", path: "" });

  useFocusEffect(useCallback(() => {
    setLoading(true);
    loadConfig();
  }, []));

  const loadConfig = () => {
    retrieveConfig()
      .then((config) => {
        console.log(`MediaScreen loaded: ${JSON.stringify(config)}`);
        setMediaFile(config.mediaFile);
        setLoading(false);
      })
      .catch((error) => {
        console.error(`MediaScreen loading error: ${JSON.stringify(error)}`);
        Snackbar.show({
          text: `MediaScreen loading error: ${JSON.stringify(error)}`,
          duration: Snackbar.LENGTH_LONG,
        });
        setLoading(false);
      });
  };

  const onStop = async () => {
    await sleep(LENGTH_SHORT);
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.field}>{mediaFile.name}</Text>
      <ActivityIndicator color="teal" size="large" animating={loading} />
      <MediaPlayer
        source={{ uri: mediaFile.path }}
        onStop={onStop}
      />
    </View>
  );
};

export default MediaScreen;
