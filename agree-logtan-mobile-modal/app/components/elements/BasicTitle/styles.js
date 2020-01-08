import { StyleSheet } from 'react-native';
import {
  COLOR_EVENT_ERROR,
  COLOR_BASE_TERTIARY_MAIN,
  FONT_LABEL1,
  FONT_PLACEHOLDER1,
  COLOR_GREY_90,
  COLOR_GREY_60,
  FONT_OVERLINE1
} from '../../../styles';
import { verticalScale, scale } from '../../../utils/scaling';

const styles = StyleSheet.create({
  errorText: {
    ...FONT_OVERLINE1,
    color: COLOR_EVENT_ERROR,
    marginTop: -5,
    textAlign: 'right',
    marginRight: 10
  },
  image: {
    height: verticalScale(16),
    width: scale(16)
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: -3
  },
  labelText: {
    ...FONT_LABEL1,
    color: COLOR_GREY_60
  },
  showPass: {
    marginLeft: scale(-30),
    marginTop: verticalScale(10)
  },
  textInput: {
    ...FONT_PLACEHOLDER1,
    color: COLOR_GREY_90,
    width: '100%',
    marginLeft: -3
  },
  counterText: {
    ...FONT_LABEL1,
    color: COLOR_BASE_TERTIARY_MAIN,
    marginLeft: scale(-30),
    marginTop: verticalScale(10)
  },
  textInputInactive: {
    ...FONT_LABEL1,
    color: COLOR_GREY_60,
    // width: scale(300),
    width: '100%',
    marginLeft: -3
  }
});

export default styles;
