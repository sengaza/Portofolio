import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_LABEL1,
  COLOR_GREY_40,
  FONT_LABEL2,
  COLOR_GREY_60,
  FONT_BODY3,
  COLOR_GREY_90
} from '../../../styles';
import { scale } from '../../../utils/scaling';

const styles = StyleSheet.create({
  bottomLabelText: {
    ...FONT_LABEL2,
    alignSelf: 'flex-start',
    color: COLOR_GREY_60
  },
  bottomPart: {
    flexDirection: 'row'
  },
  bottomPartItem: {
    flex: 1
  },
  bottomValueText: {
    ...FONT_BODY3,
    alignSelf: 'flex-start',
    color: COLOR_GREY_90
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  imageLeft: {
    alignItems: 'center',
    height: 65,
    justifyContent: 'center',
    marginRight: scale(10),
    width: 65
  },
  leftCard: {
    flex: 1,
    marginLeft: 5
  },
  landText: {
    ...FONT_LABEL1,
    fontFamily: 'Montserrat-Bold',
    color: COLOR_GREY_90
  },
  outerContainer: {
    backgroundColor: COLOR_WHITE,
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 0.5,
    height: 100,
    padding: 20
  },
  topPart: {
    flex: 1
  }
});

export default styles;
