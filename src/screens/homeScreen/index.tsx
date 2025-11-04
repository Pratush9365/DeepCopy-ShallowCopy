import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from './styles';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Click Me</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const HomeScreen = () => {
//   return (
//     <View>
//       <Text>index</Text>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({});
