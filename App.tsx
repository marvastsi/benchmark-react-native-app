import React from "react";
import Routes from "./src/routes";

export default () => (<Routes />);

// ///////////////////////////////////////////
// ///////////////////////////////////////////

// // import { Text } from "@react-native-material/core";
// // import React, {useState, useEffect} from 'react';
// // import { SafeAreaView } from "react-native";
// // import RNFS from 'react-native-fs';
// // 
// // const App = () => {
// //   const [downloadsFolder, setDownloadsFolder] = useState('');
// //   const [documentsFolder, setDocumentsFolder] = useState('');
// //   const [externalDirectory, setExternalDirectory] = useState('');
// //   useEffect(() => {
// //     //get user's file paths from react-native-fs
// //     setDownloadsFolder(RNFS.DownloadDirectoryPath);
// //     setDocumentsFolder(RNFS.DocumentDirectoryPath); //alternative to MainBundleDirectory.
// //     setExternalDirectory(RNFS.ExternalStorageDirectoryPath);
// //   }, []);
// //   return (
// //     <SafeAreaView>
// //       <Text> Downloads Folder: {downloadsFolder}</Text>
// //       <Text>Documents folder: {documentsFolder}</Text>
// //       <Text>External storage: {externalDirectory}</Text>
// //     </SafeAreaView>
// //   );
// // };

// // export default App;