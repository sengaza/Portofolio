import { StyleSheet, Platform } from 'react-native';
import { COLOR_WHITE, FONT_HEADLINE4, COLOR_GREY_90 } from '../../../styles';

export default StyleSheet.create({
  bottomContainer: {
    backgroundColor: COLOR_WHITE,
    height: 56
  },
  centerContainer: {
    flex: 4,
    justifyContent: 'center',
    marginLeft: 20
  },
  container: {
    backgroundColor: COLOR_WHITE,
    flexDirection: 'row',
    marginTop: 40
  },
  leftRightContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    ...FONT_HEADLINE4,
    color: COLOR_GREY_90
  },
  topContainer: {
    flexDirection: 'row',
    backgroundColor: COLOR_WHITE,
    height: Platform.OS === 'ios' ? 44 : 56
  },
  leftContainerStyle: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  rightContainerStyle: {
    alignItems: 'flex-end',
    marginRight: 20
  }
});
