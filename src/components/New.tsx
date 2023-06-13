import React from 'react';
import {TouchableOpacity, View, StyleSheet, Text} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';

const App = () => {
 const [inProgress, setInProgress] = React.useState(false);
 const turnProgress = () => {
    setInProgress(!inProgress);
 }
  return (
    <View style={styles.container}>
      <View style={styles.example}>
            <TouchableOpacity
            style={styles.formButton}
                onPress={turnProgress}
            >
                <Text style={{color: '#ffffff'}}>Click-me</Text>
            </TouchableOpacity>
      </View>
      <View style={styles.example}>
        <Text>Circle Progress Indicator</Text>
                <ProgressBar animating={inProgress} styleAttr="Large" />
      </View>
      <View style={styles.example}>
        <Text>Horizontal Progress Indicator</Text>
        <ProgressBar styleAttr="Horizontal" />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Indicator</Text>
        <ProgressBar styleAttr="Horizontal" color="#2196F3" />
      </View>
      <View style={styles.example}>
        <Text>Fixed Progress Value</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
  formButton: {
        color: '#fffff',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        elevation: 6,
        height: 40,
        marginTop: 50,
        paddingHorizontal: 10,
        backgroundColor: 'teal',
    },
});

export default App;