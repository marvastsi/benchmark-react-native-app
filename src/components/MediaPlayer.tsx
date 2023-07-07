import React, { useRef, useState } from "react";
import { Alert, StyleSheet, ViewProps } from "react-native";
import Video, { OnLoadData, OnProgressData } from "react-native-video";

enum ResizeMode {
    stretch = "stretch", contain = "contain", cover = "cover", none = "none"
}

enum PLAYER_STATE {
    PLAYING = 0,
    PAUSED = 1,
    ENDED = 2
}

export interface MediaPlayerProps extends ViewProps {
    /**
     * source={{ uri: 'https://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_10mb.mp4' }};
     * 
     * __
     * 
     * source={{ uri: 'file:///sdcard/Movies/sintel.mp4' }} 
     * 
     * __
     * 
     * source={{ uri: 'ipod-library:///path/to/music.mp3' }} 
     * 
     * __
     * 
     * source={{ uri: 'http://host-serving-a-type-different-than-the-extension.ism/manifest(format=mpd-time-csf)', type: 'mpd' }} 
     * 
     * __
     * 
     * const sintel = require('./sintel.mp4');
     * 
     * source={sintel}
     * 
     * __
     *
     * source={{
     *    uri: "https://www.example.com/video.mp4",
     *    headers: {
     *      Authorization: 'bearer some-token-value',
     *      'X-Custom-Header': 'some value'
     *    }
     *  }}
     */
    source: { uri?: string | undefined, headers?: { [key: string]: string } | undefined, type?: string | undefined } | number;
    onStop?(): void;
}

const MediaPlayer = (props: MediaPlayerProps) => {
    const { source, onStop } = props;

    const videoPlayer = useRef<Video>(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [paused, setPaused] = useState(false);
    const [
        playerState, setPlayerState
    ] = useState(PLAYER_STATE.PLAYING);
    const [screenType, setScreenType] = useState<ResizeMode>(ResizeMode.contain);

    const onSeek = (seek: number) => {
        videoPlayer.current.seek(seek);
    };
    const onSeeking = (currentTime: number) => setCurrentTime(currentTime);

    const onPaused = (playerState: PLAYER_STATE) => {
        setPaused(!paused);
        setPlayerState(playerState);
    };

    const onReplay = () => {
        setPlayerState(PLAYER_STATE.PLAYING);
        videoPlayer.current.seek(0);
    };

    const onProgress = (data: OnProgressData) => {
        if (!isLoading && playerState !== PLAYER_STATE.ENDED) {
            setCurrentTime(data.currentTime);
        }
    };

    const onLoaded = (data: OnLoadData) => {
        setDuration(data.duration);
        setIsLoading(false);
    };

    const onLoading = () => setIsLoading(true);

    const onEnd = () => {
        setPlayerState(PLAYER_STATE.ENDED);
        onStop();
    }

    const onError = (error: any) => Alert.alert("Error loading video", error);

    const onFullScreen = () => {
        setIsFullScreen(isFullScreen);
        if (screenType == ResizeMode.contain) {
            setScreenType(ResizeMode.cover);
        } else {
            setScreenType(ResizeMode.contain);
        }
    };

    const dismissFullScreen = () => { };
    const presentFullScreen = () => { };
    const onFullscreenPlayerWillPresent = () => { };
    const onFullscreenPlayerDidPresent = () => { };
    const onFullscreenPlayerWillDismiss = () => { };
    const onFullscreenPlayerDidDismiss = () => { };

    return (
        <Video
            onEnd={onEnd}
            onLoad={onLoaded}
            onLoadStart={onLoading}
            onProgress={onProgress}
            paused={paused}
            ref={videoPlayer}
            resizeMode={screenType}
            onFullscreenPlayerWillPresent={onFullscreenPlayerWillPresent}
            onFullscreenPlayerDidPresent={onFullscreenPlayerDidPresent}
            onFullscreenPlayerWillDismiss={onFullscreenPlayerWillDismiss}
            onFullscreenPlayerDidDismiss={onFullscreenPlayerDidDismiss}
            source={source}
            style={styles.mediaPlayer}
            volume={10}
            controls={true}
        />
    );
};

export default MediaPlayer;

const styles = StyleSheet.create({
    mediaPlayer: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        marginHorizontal: 4,
    },
});
