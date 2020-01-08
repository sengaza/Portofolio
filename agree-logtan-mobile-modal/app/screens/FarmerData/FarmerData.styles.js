import { StyleSheet } from 'react-native';
import { COLOR_PAGE_BACKGROUND } from '../../styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR_PAGE_BACKGROUND,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_PAGE_BACKGROUND
  }
});

export default styles;
