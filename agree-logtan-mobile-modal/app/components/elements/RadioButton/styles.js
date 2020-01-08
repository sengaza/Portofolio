import { StyleSheet } from 'react-native';
import { COLOR_WHITE, COLOR_BASE_PRIMARY_MAIN, COLOR_GREY_90, FONT_BODY2 } from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  circle: {
    width: 20,
    height: 20,
    margin: 10,
    borderWidth: 2,
    borderColor: COLOR_BASE_PRIMARY_MAIN,
    borderRadius: 10,
    alignSelf: 'flex-start',
    justifyContent: 'center'
  },
  label: {
    ...FONT_BODY2,
    color: COLOR_GREY_90,
    alignSelf: 'center',
    textAlign: 'left',
    textAlignVertical: 'center'
  },
  selected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLOR_WHITE,
    backgroundColor: COLOR_BASE_PRIMARY_MAIN
  }
});
