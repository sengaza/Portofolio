import { StyleSheet } from 'react-native';
import { FONT_OVERLINE2, COLOR_WHITE, COLOR_BASE_PRIMARY_MAIN } from '../../../styles';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 34,
    right: 22,
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    elevation: 5
  },
  circle: {
    right: 22,
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleText: {
    ...FONT_OVERLINE2,
    color: COLOR_WHITE
  },
  circleContainer: {
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  }
});
