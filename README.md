# benchmark-react-native-app
React Native APP benchmark

## Generating Release (signed APK) 

- Generate keystore
```
keytool -genkeypair -v -storetype PKCS12 -keystore my-key-file.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
- Copy `my-key-file.keystore` under the `android/app` directory in your project folder.

- Create/edit the `~/.gradle/gradle.properties` file (replace ***** with the your keystore password)

```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```
### Adding signing config to app's Gradle config
```
...
android {
    ...
    signingConfigs {
        debug { ... }
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        debug { ... }
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
...
```
### Generating the release AAB ([Android App Bundle](https://developer.android.com/guide/app-bundle))

> For react-native versions < 0.72

Step - 1
```
$ cd android
$ ./gradlew clean
```
Step - 2
```
$ ./gradlew bundleRelease
```

___
DOC: https://reactnative.dev/docs/0.69/signed-apk-android