import { StyleSheet, Platform } from 'react-native';
import { COLOR_WHITE, FONT_HEADLINE4, COLOR_GREY_90 } from '../../../styles';

export default StyleSheet.create({
  bottomContainer: {
    backgroundColor: COLOR_WHITE,
    height: 56
  },
  centerContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginLeft: 20
  },
  container: {
    // height: 100,
    // justifyContent: 'center',
    marginTop: 40,
    alignContent: 'center',
    justifyContent: 'center'
  },
  leftRightContainer: {
    alignItems: 'center',
    flex: 4,
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
