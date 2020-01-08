import { StyleSheet } from 'react-native';
import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_WHITE,
  FONT_SUBTITLE1,
  FONT_LABEL1,
  FONT_OVERLINE1,
  COLOR_GREY_40,
  FONT_LABEL2,
  COLOR_GREY_60,
  FONT_BODY3,
  COLOR_GREY_90
} from '../../../styles';
import { verticalScale, scale } from '../../../utils/scaling';

const styles = StyleSheet.create({
  bottomPart: {
    flex: 1
  },
  container: {
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
    width: 65,
    borderRadius: 2
  },
  imageRight: {
    height: verticalScale(15),
    width: scale(15)
  },
  landProfile: {
    ...FONT_SUBTITLE1,
    color: COLOR_WHITE
  },
  landText: {
    ...FONT_LABEL1,
    color: COLOR_WHITE
  },
  leftCard: {
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 5,
    width: '30%'
  },
  nameText: {
    ...FONT_LABEL1,
    fontFamily: 'Montserrat-Bold',
    color: COLOR_GREY_90
  },
  nikNumber: {
    ...FONT_BODY3,
    alignSelf: 'flex-start',
    color: COLOR_GREY_90
  },
  nikText: {
    ...FONT_LABEL2,
    alignSelf: 'flex-start',
    color: COLOR_GREY_60
  },
  outerContainer: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 0.5,
    height: 100,
    padding: 20
  },
  rightCard: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 5,
    width: '30%'
  },
  statusText: {
    ...FONT_OVERLINE1,
    color: COLOR_GREY_60,
    marginBottom: 5,
    marginLeft: 5
  },
  titleText: {
    ...FONT_SUBTITLE1,
    color: COLOR_BASE_PRIMARY_MAIN
  },
  topLandProfile: {
    backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    height: 25,
    position: 'absolute',
    top: 0,
    width: 80
  },
  topPart: {
    flex: 1
  },
  topRightPart: {
    flexDirection: 'row',
    flex: 1,
    marginLeft: '40%'
  }
});

export default styles;
