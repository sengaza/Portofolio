import { StyleSheet, Platform } from 'react-native';
import { COLOR_WHITE, COLOR_BASE_PRIMARY_MAIN, FONT_HEADLINE6 } from '../../../styles';

export default StyleSheet.create({
  centerContainer: {
    alignItems: 'center',
    flex: 4,
    justifyContent: 'center'
  },
  container: {
    backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    flexDirection: 'row',
    height: Platform.OS === 'ios' ? 44 : 56
  },
  leftRightContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    ...FONT_HEADLINE6,
    color: COLOR_WHITE
  }
});
