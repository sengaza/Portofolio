import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  COLOR_GREY,
  FONT_BODY2,
  FONT_BODY1,
  COLOR_BASE_TERTIARY_MAIN,
  COLOR_GREY_90,
  COLOR_PAGE_BACKGROUND,
  FONT_LABEL2,
  COLOR_GREY_60
} from '../../styles';
import { verticalScale, scale } from '../../utils/scaling';

const styles = StyleSheet.create({
  containerDetail: {
    flex: 1
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_PAGE_BACKGROUND
  },
  headerContainer: {
    height: verticalScale(125)
  },
  line: {
    marginTop: 20,
    height: 0.3,
    width: '100%',
    backgroundColor: COLOR_GREY
  },
  label: {
    flex: 1,
    ...FONT_BODY2,
    color: COLOR_BASE_TERTIARY_MAIN,
    marginTop: 5
  },
  text: {
    flex: 1,
    ...FONT_BODY1,
    color: COLOR_GREY_90,
    marginTop: 5,
    marginBottom: 5
  },
  textAddress: {
    ...FONT_BODY1,
    color: COLOR_GREY_90,
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'justify'
  },
  subContainer: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    flexDirection: 'row'
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginHorizontal: 24,
    marginTop: 19,
    marginBottom: 20
  },
  textContainer: {
    flex: 4,
    flexDirection: 'row'
  },
  textLand: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  totalLand: {
    ...FONT_BODY1,
    color: COLOR_GREY_90,
    marginLeft: scale(5)
  },
  leftPart: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  rightPart: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  centerPart: {
    flex: 1,
    alignSelf: 'flex-start'
  },
  bottomPart: {
    flexDirection: 'row',
    marginTop: verticalScale(15)
  },
  leftContainer: {
    flex: 1,
    marginLeft: 20,
    marginTop: 19,
    marginBottom: 20
  },
  rightContainer: {
    flex: 1,
    marginRight: 20,
    marginTop: 19,
    marginBottom: 20
  },
  leftHeaderContainer: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  rightHeaderContainer: {
    alignItems: 'flex-end',
    marginRight: 20
  },
  progressCardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 19,
    marginBottom: 20
  },
  guideText: {
    marginLeft: 20,
    marginTop: 19,
    ...FONT_LABEL2,
    color: COLOR_GREY_60
  }
});

export default styles;
