import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_LABEL1,
  COLOR_GREY_60,
  FONT_BODY1,
  COLOR_GREY_90,
  COLOR_GREY_40
} from '../../styles';

const styles = StyleSheet.create({
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_GREY_60
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  },
  formComponentsContainer: {
    margin: 20
  },
  buttonArea: {
    flex: 0.33,
    backgroundColor: COLOR_WHITE
  },
  button: {
    alignSelf: 'center'
  },
  workSince: {
    marginHorizontal: 20
  },
  workSinceTextContainer: {
    flex: 1,
    marginRight: 20
  },
  workSincePickerContainer: {
    flex: 0.5,
    marginTop: 10
  },
  ghost: {
    ...FONT_LABEL1
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
