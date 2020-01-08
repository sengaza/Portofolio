import { StyleSheet } from 'react-native';
import {
  COLOR_BASE_TERTIARY_MAIN,
  COLOR_GREY_40,
  COLOR_GREY_60,
  COLOR_GREY_90,
  COLOR_WHITE,
  FONT_BODY1,
  FONT_BODY3,
  FONT_LABEL1
} from '../../styles';
import { scale } from '../../utils/scaling';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 0.33,
    backgroundColor: COLOR_WHITE
  },
  button: {
    alignSelf: 'center'
  },
  formContainer: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    height: '100%'
  },
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_BASE_TERTIARY_MAIN
  },
  fieldContainer: {
    alignSelf: 'center',
    marginTop: 20,
    width: scale(300)
  },
  fieldText: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  fieldTextEmpty: {
    ...FONT_BODY1,
    color: COLOR_GREY_40
  },
  fieldButton: {
    marginTop: 8,
    alignItems: 'center',
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 10
  },
  loadingContainer: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  },
  loaddingComponent: {
    alignItems: 'center',
    marginTop: -56
  },
  loadingText: {
    ...FONT_BODY3,
    color: COLOR_GREY_60
  },
  snackBarContainer: {
    position: 'relative',
    top: 50
  }
});

export default styles;
