import { StyleSheet } from 'react-native';
import { COLOR_WHITE } from '../../styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    flex: 1,
    justifyContent: 'center'
  },
  leftContainer: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  rightContainer: {
    alignItems: 'flex-end',
    marginRight: 20
  }
});

export default styles;
