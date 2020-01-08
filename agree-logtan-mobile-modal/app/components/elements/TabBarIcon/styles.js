import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  COLOR_GREY_90,
  COLOR_GREY_60,
  FONT_OVERLINE2,
  FONT_LABEL2,
  COLOR_EVENT_ERROR
} from '../../../styles';

export default StyleSheet.create({
  IconBadgeNumber: {
    alignItems: 'center',
    backgroundColor: COLOR_EVENT_ERROR,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 10,
    width: 18
  },
  IconBadgeStandard: {
    alignItems: 'center',
    backgroundColor: COLOR_EVENT_ERROR,
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    position: 'absolute',
    right: 2,
    top: 12,
    width: 14
  },
  active: {},
  activeText: {
    ...FONT_OVERLINE2,
    alignSelf: 'center',
    color: COLOR_GREY_90
  },
  container: {
    flex: 1,
    height: 40
  },
  icon: {},
  inactive: {},
  mainView: {
    alignItems: 'center',
    backgroundColor: COLOR_WHITE,
    // height: 50,
    marginTop: 15,
    justifyContent: 'center'
    // width: 60
  },
  text: {
    ...FONT_LABEL2,
    alignSelf: 'center',
    color: COLOR_GREY_60
  }
});
