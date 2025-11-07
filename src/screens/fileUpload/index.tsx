import {useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {
  DocumentPickerResponse,
  pick,
  types,
  // isErrorWithCode,
} from '@react-native-documents/picker';
import {styles} from './styles';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] =
    useState<DocumentPickerResponse | null>(null);
  // const [error, setError] = useState('');s

  const pickDocument = async () => {
    let RNFS = require('react-native-fs');
    try {
      const result = await pick({type: [types.allFiles]});
      const file = Array.isArray(result) ? result[0] : result;
      console.log('Picked file:', file.type);

      const destPath = `${RNFS.DocumentDirectoryPath}/${file.name}`;

      await RNFS.copyFile(file.uri, destPath);

      const fileStat = await RNFS.stat(destPath);
      console.log('File Stat:', fileStat);

      const MAX_SIZE = 100 * 1024 * 1024;

      if (fileStat.size > MAX_SIZE) {
        Alert.alert(
          'File Too Large',
          'Please select a file smaller than 100 MB.',
        );
        return;
      } else {
        setSelectedFile(file);
      }
      console.log('Valid file path:', destPath);
    } catch (err) {
      throw err;
      // setError(String(err));
    }
  };

  const uploadFile = () => {
    setSelectedFile(null);
  };

  return (
    <View style={styles.container}>
      {selectedFile ? (
        <Text style={{marginBottom: 10, color: '#000'}}>
          Selected File: {selectedFile.name}
        </Text>
      ) : (
        <Text style={{marginBottom: 10, color: 'red'}}>No File Selected</Text>
      )}

      <View>
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.text}>Pick Document</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={uploadFile}>
          <Text style={styles.text}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FileUploadComponent;
