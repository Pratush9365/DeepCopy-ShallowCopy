import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useState} from 'react';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import styles from './styles';

const ProfilePicture = () => {
  const [image, setImage] = useState<Asset | null>(null);

  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
    includeBase64: false,
  };

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
  return (
    <View style={styles.container}>
      {image && <Image source={{uri: image.uri}} style={styles.images} />}
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text style={styles.text}>Image Picker</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={removedImage}>
        <Text style={styles.text}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePicture;
