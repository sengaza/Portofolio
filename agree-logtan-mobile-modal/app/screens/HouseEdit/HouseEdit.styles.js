import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_LABEL1,
  COLOR_GREY_60,
  COLOR_GREY_40,
  FONT_BODY1,
  COLOR_GREY_90
} from '../../styles';

const styles = StyleSheet.create({
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_GREY_60,
    marginBottom: 10
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  },
  formComponentsContainer: {
    margin: 20
  },
  buttonArea: {
    backgroundColor: COLOR_WHITE
  },
  button: {
    alignSelf: 'center',
    marginVertical: 20
  },
  inputStyle: {
    marginHorizontal: 25
  },
  pickerStyle: {
    marginHorizontal: 25,
    marginBottom: 25
  },
  dobText: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  dobTextEmpty: {
    ...FONT_BODY1,
    color: COLOR_GREY_40
  },
  dobButton: {
    alignItems: 'center',
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 12,
    paddingRight: 10
  },
  datePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR_WHITE
  }
});

export default styles;
