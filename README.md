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
$ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle
```
Step - 3
```
$ ./gradlew bundleRelease
```

### Testing the release build on your device ([Testing Release Build]( https://reactnative-archive-august-2023.netlify.app/docs/0.69/signed-apk-android#testing-the-release-build-of-your-app))


```
$ npx react-native run-android --variant=release

## OR
$ cd android/ & ./gradlew installRelease
```

In case of error like this:
```
* What went wrong:
Execution failed for task ':app:installRelease'.
  > java.util.concurrent.ExecutionException: com.android.builder.testing.api.DeviceException: com.android.ddmlib.InstallException: INSTALL_FAILED_UPDATE_INCOMPATIBLE: Existing package br.edu.utfpr.marvas.benchmark_rn signatures do not match newer version; ignoring!
```

Uninstall old instances of the app with different versions:

```
adb uninstall "br.edu.utfpr.marvas.benchmark_rn"
```


DOC (0.69):

https://reactnative-archive-august-2023.netlify.app/docs/0.69/environment-setup?guide=native

https://reactnative-archive-august-2023.netlify.app/docs/0.69/signed-apk-android

---
DOC All Versions: https://reactnative.dev/versions