import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_BODY3,
  COLOR_GREY_90,
  FONT_SUBTITLE1,
  COLOR_GREY_40,
  FONT_BODY2
} from '../../../styles';

const styles = StyleSheet.create({
  button: {
    elevation: 0,
    marginHorizontal: 10,
    width: 100
  },
  container: {
    backgroundColor: COLOR_WHITE,
    height: '100%',
    width: '100%',
    marginTop: 50
  },
  listContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLOR_GREY_40,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    height: 60
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
  textList: {
    ...FONT_BODY2,
    color: COLOR_GREY_90,
    textAlignVertical: 'center'
  },
  titleText: {
    ...FONT_SUBTITLE1,
    color: COLOR_GREY_90,
    paddingLeft: 20,
    alignSelf: 'flex-start'
  }
});

export default styles;
