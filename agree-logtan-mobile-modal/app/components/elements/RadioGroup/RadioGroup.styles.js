import { StyleSheet } from 'react-native';
import { COLOR_GREY, COLOR_GREY_60 } from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  labelStyle: {
    color: COLOR_GREY
  },
  circleStyle: {
    borderColor: COLOR_GREY
  },
  selectedStyle: {
    backgroundColor: COLOR_GREY_60
  }
});
