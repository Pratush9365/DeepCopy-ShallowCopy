import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'blue',
    borderRadius: 8,
  },
  images: {width: 150, height: 150, borderRadius: 10, marginBottom: 10},
  text1: {
    fontSize: 15,
    color: '#000000',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
});
export default styles;
