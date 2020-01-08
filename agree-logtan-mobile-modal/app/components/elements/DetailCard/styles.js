import { StyleSheet } from 'react-native';
import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_WHITE,
  COLOR_GREY_90,
  COLOR_BASE_TERTIARY_MAIN,
  FONT_SUBTITLE1,
  FONT_LABEL2,
  FONT_BODY3,
  FONT_BODY2,
  COLOR_GREY_60,
  FONT_OVERLINE1,
  COLOR_GREY_40,
  FONT_BODY1
} from '../../../styles';
import { verticalScale, scale } from '../../../utils/scaling';

const styles = StyleSheet.create({
  bottomPart: {
    flex: 1
  },
  buttonCallMsg: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    marginLeft: 15,
    marginTop: -5
  },
  callMsgText: {
    marginTop: 5,
    ...FONT_BODY2,
    color: COLOR_BASE_TERTIARY_MAIN
  },
  cardText1: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  cardText2: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  container: {
    // flex: 3,
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%'
  },
  detail: {
    height: verticalScale(15),
    width: scale(15)
  },
  imageLeft: {
    alignItems: 'center',
    height: 65,
    justifyContent: 'center',
    marginRight: scale(10),
    width: 65
  },
  label: {
    ...FONT_LABEL2,
    color: COLOR_GREY_60
  },
  label2: {
    ...FONT_LABEL2,
    color: COLOR_GREY_60
  },
  leftPart: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 5
  },
  outerContainer: {
    backgroundColor: COLOR_WHITE,
    borderBottomColor: COLOR_GREY_40,
    borderBottomWidth: 0.5,
    height: 100,
    padding: 20
  },
  rightBottomPart: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: '33%'
  },
  rightPart: {
    flex: 1
  },
  rightTopPart: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: '50%'
  },
  statusText: {
    ...FONT_OVERLINE1,
    color: COLOR_GREY_60,
    marginLeft: 5
  },
  text: {
    ...FONT_BODY3,
    color: COLOR_GREY_90
  },
  text2: {
    ...FONT_BODY3,
    color: COLOR_GREY_90
  },
  titleText: {
    ...FONT_SUBTITLE1,
    color: COLOR_BASE_PRIMARY_MAIN
  },
  topPart: {
    flex: 1
  }
});

export default styles;
