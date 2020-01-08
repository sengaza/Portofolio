import { StyleSheet } from 'react-native';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_GREY, COLOR_TRANSPARENT, FONT_BODY1 } from '../../../styles';

export default StyleSheet.create({
  bottomLine: {
    backgroundColor: COLOR_TRANSPARENT,
    height: 2
  },
  bottomLineHighlight: {
    backgroundColor: COLOR_BASE_PRIMARY_MAIN
  },
  tab: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  tabBar: {
    flexDirection: 'row'
  },
  tabLabel: {
    alignSelf: 'center',
    color: COLOR_GREY,
    paddingVertical: 10,
    ...FONT_BODY1
  },
  tabLabelSelected: {
    color: COLOR_BASE_PRIMARY_MAIN
  },
  tabbyContainer: {
    flex: 1
  }
});
