import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  text: {fontSize: 16, fontWeight: '600', marginBottom: 6},
  date: {
    fontSize: 18,
    color: 'white',
    margin: 10,
  },
  container1: {
    flexDirection: 'row',
    marginHorizontal: 16,
  },
  button: {
    borderWidth: 1,
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
export default styles;
