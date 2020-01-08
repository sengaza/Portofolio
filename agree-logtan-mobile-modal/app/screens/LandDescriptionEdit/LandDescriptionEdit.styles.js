import { StyleSheet } from 'react-native';
import {
  COLOR_BASE_TERTIARY_MAIN,
  COLOR_GREY_40,
  COLOR_GREY_90,
  COLOR_WHITE,
  FONT_BODY1,
  FONT_LABEL1
} from '../../styles';
import { scale, verticalScale } from '../../utils/scaling';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.33,
    backgroundColor: COLOR_WHITE
  },
  button: {
    alignSelf: 'center'
  },
  dropdownContainer: {
    marginRight: scale(-15),
    marginTop: verticalScale(-10),
    width: scale(100)
  },
  formContainer: {
    backgroundColor: COLOR_WHITE,
    flex: 1
  },
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_BASE_TERTIARY_MAIN
  },
  inputBox: {
    alignSelf: 'center',
    marginTop: 20,
    width: scale(300)
  },
  inputBoxSize: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: scale(300)
  },
  inputSize: {
    flex: 2,
    marginRight: scale(2)
  },
  inputUnit: {
    flex: 1
  },
  inputUnitPicker: {
    marginTop: verticalScale(11.5)
  },
  irrigationContainer: {
    marginLeft: 0,
    marginTop: verticalScale(-10)
  },
  irrigationTextStyle: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  irrigationTextStyleEmpty: {
    ...FONT_BODY1,
    color: COLOR_GREY_40
  },
  snackBarContainer: {
    position: 'relative',
    top: 50
  }
});

export default styles;
