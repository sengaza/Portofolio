import { StyleSheet } from 'react-native';
import { FONT_BODY1, COLOR_GREY_90, COLOR_GREY_40 } from '../../../styles';
import { verticalScale, scale } from '../../../utils/scaling';

const styles = StyleSheet.create({
  image: {
    alignSelf: 'flex-end',
    height: verticalScale(15),
    marginBottom: 3,
    width: scale(13)
  },
  pickerContainer: {
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 1,
    height: verticalScale(40),
    justifyContent: 'center',
    paddingRight: 15,
    width: '100%'
  },
  textStyle: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  placeholderStyle: {
    ...FONT_BODY1,
    color: COLOR_GREY_40
  },
  textStyle2: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  }
});

export default styles;
