import { StyleSheet } from 'react-native';
import {
  COLOR_BASE_PRIMARY_LIGHT,
  FONT_OVERLINE2,
  COLOR_WHITE,
  FONT_LABEL1,
  FONT_LABEL2,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_GREY_40,
  COLOR_PROGRESS_YELLOW
} from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: COLOR_WHITE,
    // justifyContent: 'space-between',
    // alignItems: 'center',
    borderRadius: 2,
    shadowRadius: 3,
    shadowOpacity: 12,
    elevation: 1,
    marginBottom: 10,
    height: 68
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: COLOR_BASE_PRIMARY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleText: {
    ...FONT_OVERLINE2,
    color: COLOR_WHITE
  },
  circleContainer: {
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  titleAndDataContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row'
  },
  titleContainer: {
    flex: 1
    // justifyContent: 'flex-start'
  },
  dataContainer: {
    flex: 1,
    marginRight: 20,
    marginBottom: 8
    // justifyContent: 'flex-start'
  },
  subtitleContainer: {
    flex: 1
    // alignItems: 'flex-start'
  },
  progress: {
    // flex: 1,
    width: 80,
    height: 6,
    backgroundColor: COLOR_PROGRESS_YELLOW,
    borderRadius: 4
  },
  progressFilled: {
    // flex: 1,
    position: 'absolute',
    width: 100,
    height: 6,
    backgroundColor: COLOR_GREY_40,
    borderRadius: 4
  },
  title: {
    ...FONT_LABEL1,
    color: COLOR_BASE_PRIMARY_DARK
  },
  subTitle: {
    ...FONT_LABEL2
  },
  centerToRightContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 8
  }
});
