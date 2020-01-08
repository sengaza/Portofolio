import { StyleSheet } from 'react-native';
import { COLOR_WHITE, FONT_BODY3, COLOR_GREY_90, FONT_SUBTITLE1 } from '../../../styles';

const styles = StyleSheet.create({
  button: {
    elevation: 0,
    marginHorizontal: 10,
    width: 100
  },
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLOR_WHITE,
    borderRadius: 2,
    height: 180,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: 270,
    elevation: 5
  },
  descText: {
    ...FONT_BODY3,
    color: COLOR_GREY_90,
    paddingLeft: 20,
    alignSelf: 'flex-start'
  },
  imageWarning: {
    // height: 25,
    // marginTop: 35,
    // width: 25
  },
  titleText: {
    ...FONT_SUBTITLE1,
    color: COLOR_GREY_90,
    paddingLeft: 20,
    alignSelf: 'flex-start'
  }
});

export default styles;
