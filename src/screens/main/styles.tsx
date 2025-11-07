import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
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
  // title: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 10,
  // },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white',
  },
  spacing: {
    height: 20,
  },
  screenWrapper: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 22, fontWeight: 'bold', color: '#000', marginBottom: 20},
});

export default styles;
