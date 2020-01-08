import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  COLOR_BASE_TERTIARY_MAIN,
  FONT_LABEL1,
  FONT_BUTTON,
  COLOR_BASE_PRIMARY_MAIN,
  FONT_BODY1,
  COLOR_GREY_90,
  COLOR_GREY_40
} from '../../styles';

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: 20
  },
  uploadContainer: {
    // flex: 1,
    // backgroundColor: 'red',
    // alignItems: 'center',
    // alignSelf: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    height: 85,
    width: '100%',
    marginBottom: 20
  },
  photoContainer: {
    // flex: 1
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
    marginTop: 8,
    alignItems: 'center',
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 10
  },
  photoTextContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  fieldContainer: {
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
    marginRight: 15
  },
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_BASE_TERTIARY_MAIN
  },
  uploadButtonStyle: {
    // flex: 1,
    marginRight: 20
  },
  profileTemplate: {
    height: 80,
    width: 80,
    borderRadius: 2
  },
  inputStyle: {
    marginHorizontal: 10
  },
  wrapperDropdown: {
    marginBottom: 18
  },
  educationContainer: {
    marginLeft: 8,
    marginRight: 15,
    marginBottom: 20
  },
  dropDownContainer: {
    flex: 1
  },
  uploadTextStyle: {
    ...FONT_BUTTON,
    color: COLOR_BASE_PRIMARY_MAIN
  },
  educationTextStyle: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  educationTextStyleEmpty: {
    ...FONT_BODY1,
    color: COLOR_GREY_40
  }
});

export default styles;
