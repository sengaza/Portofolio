import { StyleSheet } from 'react-native';
import {
  COLOR_GREY,
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_WHITE,
  COLOR_EVENT_ERROR,
  FONT_BODY1,
  FONT_HEADLINE3,
  FONT_BODY2,
  FONT_BUTTON
} from '../../styles';
import { scale, verticalScale } from '../../utils/scaling';

const styles = StyleSheet.create({
  account: {
    ...FONT_BODY1,
    alignSelf: 'center',
    color: COLOR_GREY,
    fontSize: 13,
    marginTop: 20
  },
  bottomContainer: {
    marginTop: 120,
    flex: 1,
    flexDirection: 'column'
  },
  button: {
    // ...FONT_BUTTON_PRIMARY,
    alignSelf: 'center'
    // height: scale(42),
    // elevation: 0.0,
    // marginTop: 60
  },
  checkBox: {
    alignSelf: 'center',
    left: scale(20),
    opacity: 0.4
  },
  container: {
    backgroundColor: COLOR_WHITE
  },
  containerLogin: {
    flex: 3,
    flexDirection: 'column'
  },
  forgotPassword: {
    ...FONT_BUTTON,
    alignSelf: 'center',
    color: COLOR_BASE_PRIMARY_MAIN,
    marginTop: 25
  },
  inputBoxName: {
    alignSelf: 'center',
    width: scale(300)
  },
  inputBoxPass: {
    alignSelf: 'center',
    marginTop: verticalScale(20),
    width: scale(300)
  },
  inputName: {
    ...FONT_BODY1
  },
  inputPass: {
    ...FONT_BODY1
  },
  logo: {
    alignSelf: 'center',
    height: scale(65),
    marginTop: verticalScale(80),
    marginBottom: verticalScale(80),
    width: scale(144)
  },
  midContainer: {
    flex: 1
  },
  register: {
    ...FONT_BODY1,
    color: COLOR_BASE_PRIMARY_MAIN,
    fontSize: 13
  },
  rememberMe: {
    alignSelf: 'center',
    ...FONT_HEADLINE3,
    color: COLOR_GREY,
    left: scale(20),
    marginBottom: scale(2),
    fontSize: 14
  },
  rememberMeContainer: {
    flexDirection: 'row',
    marginTop: 10
  },
  textError: {
    ...FONT_BODY2,
    alignSelf: 'center',
    color: COLOR_EVENT_ERROR,
    top: verticalScale(140)
  },
  topContainer: {
    flex: 1
  }
});

export default styles;
