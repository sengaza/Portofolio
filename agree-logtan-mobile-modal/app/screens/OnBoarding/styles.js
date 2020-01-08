import { StyleSheet } from 'react-native';
import { COLOR_BASE_PRIMARY_MAIN } from '../../styles';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 20
  }
});

export default styles;
