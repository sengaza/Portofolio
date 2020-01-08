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
    width: '110%'
  },
  dateButton: {
    marginTop: 8,
    alignItems: 'center',
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 10
  },
  dateText: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  dateTextEmpty: {
    ...FONT_BODY1,
    color: COLOR_GREY_40
  },
  dropdownContainer: {
    marginRight: 0,
    marginTop: verticalScale(-44),
    width: scale(100)
  },
  fieldContainer: {
    alignSelf: 'center',
    marginTop: 20,
    width: scale(300)
  },
  formContainer: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    height: '100%'
  },
  inputBox: {
    alignSelf: 'center',
    width: scale(300)
  },
  inputBoxSize: {
    alignSelf: 'center',
    flexDirection: 'row',
    width: scale(300),
    height: verticalScale(50)
  },
  inputSize: {
    flex: 2,
    marginRight: scale(2)
  },
  inputUnit: {
    alignSelf: 'flex-end',
    flex: 1
  },
  inputUnitPicker: {
    marginTop: verticalScale(11.5)
  },
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_BASE_TERTIARY_MAIN
  },
  snackBarContainer: {
    position: 'relative',
    top: 50
  }
});

export default styles;
