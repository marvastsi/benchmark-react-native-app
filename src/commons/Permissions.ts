import {
    Permission,
    PermissionsAndroid,
    Platform
} from "react-native";

const requestPermission = async () => {
    if (Platform.OS === "android") {
        try {
            const writeExternalStorage = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
            if (writeExternalStorage) {
                console.log("writeExternalStorage OK.");
            } else {
                console.warn("writeExternalStorage Missing");
                await requestPermissionExternal("android.permission.MANAGE_EXTERNAL_STORAGE" as Permission);
            }
        } catch (err) {
            console.error(">>>>> " + err);
            throw err
        }
    }
};

const requestPermissionExternal = async (permission: Permission) => {
    const granteds = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        permission
    ],
        // {
        //     title: "Storage Permission Required",
        //     message:
        //         "Application needs access to your storage to download File",
        //     buttonPositive: "Agree",
        //     buttonNegative: "Deny",
        // }
    );

    if (
        granteds[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED ||
        granteds[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] === PermissionsAndroid.RESULTS.GRANTED ||
        granteds[permission] === PermissionsAndroid.RESULTS.GRANTED
    ) {
        console.log("Storage Permission Granted.");
    } else {
        console.error(`Storage Permission Not Granted ${permission}`);
        throw new Error(`Storage Permission Not Granted ${permission}`)
    }
};

export default requestPermission;
