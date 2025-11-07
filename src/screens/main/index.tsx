import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  Platform,
  Image,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
// import {deepCopy} from '../../utils/deepCopy&shallowCopy/deepcopy';
// import {shallowCopy} from '../../utils/deepCopy&shallowCopy/shallowCopy';
import styles from './styles';

import {RESULTS, PERMISSIONS, request, check} from 'react-native-permissions';
import {useNavigation} from '@react-navigation/native';
import {screenNames} from '../../utils/screenNames';
// import {permissionResult} from './@type';
export default function DemoScreen() {
  const navigation: any = useNavigation();
  // const originalUser = {
  //   name: 'Pratush',
  //   profile: {city: 'Varanasi', age: 24},
  // };

  // const [user, setUser] = useState(originalUser);

  // State to store selected image
  const [image, setImage] = useState<Asset | null>(null);
  const [denyCount, setDenyCount] = useState(0);
  // const [isPickerVisible, setIsPickerVisible] = useState(false);

  // const [error, setError] = useState<String | null>('');
  // Image Picker options
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
  };

  // const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  const permissionType = Platform.select({
    android:
      Number(Platform.Version) >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
  });

  const checkAndRequestPermission = async () => {
    if (!permissionType) {
      return;
    }

    const status = await check(permissionType);

    switch (status) {
      case RESULTS.GRANTED:
        openGallery();
        break;

      case RESULTS.DENIED:
        if (Platform.OS === 'android') {
          if (denyCount >= 1) {
            Alert.alert(
              'Permission Blocked',
              'Please enable access in settings.',
              [
                {text: 'Cancel', style: 'cancel'},
                {text: 'Open Settings', onPress: () => Linking.openSettings()},
              ],
            );
            return;
          }
          setDenyCount(prev => prev + 1);
          const req = await request(permissionType);

          if (req === RESULTS.GRANTED) {
            openGallery();
          }
        } else {
          const req = await request(permissionType);
          if (req === RESULTS.GRANTED) {
            openGallery();
          }
        }
        break;

      // case RESULTS.DENIED:
      //   const req = await request(permissionType);
      //   console.log('>>>>Req', req);
      //   if (req === RESULTS.GRANTED) {
      //     openGallery();
      //   }
      //   break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          'Please enable photo permission in Settings',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
        break;
    }
  };

  // if (status === RESULTS.GRANTED) {
  //   openGallery();
  //   return;
  // }
  // if (status === RESULTS.DENIED) {
  //   console.log('>>>>>>>>', status);
  //   const req = await request(permissionType);
  //   console.log('>>>>Req', req);
  //   if (req === RESULTS.GRANTED) {
  //     openGallery();
  //   }
  //   return;
  // }

  //   if (status === RESULTS.BLOCKED) {
  //     Alert.alert(
  //       'Permission Blocked',
  //       'Please enable photo permission in Settings',
  //       [
  //         {text: 'Cancel', style: 'cancel'},
  //         {text: 'Open Settings', onPress: () => Linking.openSettings()},
  //       ],
  //     );
  //   }
  // };

  const openGallery = async () => {
    try {
      const result = await launchImageLibrary(options);
      console.log(result);
      if (result?.assets && result.assets.length > 0) {
        setImage(result.assets[0]);
      }
    } catch (err) {}
  };
  const removedImage = () => {
    setImage(null);
  };

  // const updateShallow = () => {
  //   const copyUser = shallowCopy(user);
  //   copyUser.profile.city = 'Delhi';
  //   setUser(copyUser);
  //   console.log('Data', copyUser);
  // };

  // const updateDeep = () => {
  //   const copyUser = deepCopy(user);
  //   copyUser.profile.city = 'MumBai';
  //   setUser(copyUser);
  //   console.log('Data', copyUser);
  // };
  // const realObject = () => {
  //   setUser(originalUser);
  //   console.log('Data', originalUser);
  // };

  // const openEmail = () => Linking.openURL('mailto:pratushpandey183@gmail.com');
  // const callPhone = () => Linking.openURL('tel:7355505709');
  // const sendSMS = () => Linking.openURL('sms:7355505709');
  // const openGithub = () => Linking.openURL('https://github.com/Pratush9365');

  return (
    <View style={styles.container}>
      {/* <View style={styles.spacing} /> */}
      {/* <Text style={styles.title}>Deep Copy & Linking Demo </Text>
      <Text style={styles.text1}>City: {user.profile.city}</Text> */}
      {/* <TouchableOpacity style={styles.button} onPress={updateShallow}>
        <Text style={styles.text}>ShallowCopy</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={updateDeep}>
        <Text style={styles.text}>DeepCopy</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={realObject}>
        <Text style={styles.text}>backButton</Text>
      </TouchableOpacity> */}
      {image && <Image source={{uri: image.uri}} style={styles.images} />}
      <TouchableOpacity
        style={styles.button}
        onPress={checkAndRequestPermission}>
        <Text style={styles.text}>Image Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={removedImage}>
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screenNames.DATE_TIME)}>
        <Text style={styles.text}>Click here to Check The Date&Time</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate(screenNames.PROFILE_SCREEN)}>
        <Text style={styles.text}>Click here to For CWC Profile</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity style={styles.button} onPress={requestCameraPermission}>
        <Text style={styles.text}>Asking Permissions</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={openEmail}>
        <Text style={styles.text}>Click To Send Email</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={callPhone}>
        <Text style={styles.text}>Click To Call</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={sendSMS}>
        <Text style={styles.text}>Click To Send Sms</Text>
      </TouchableOpacity> */}
      {/* <TouchableOpacity style={styles.button} onPress={openGithub}>
        <Text style={styles.text}>Click To Open Github</Text>
      </TouchableOpacity> */}
    </View>
  );
}
