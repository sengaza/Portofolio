import { StyleSheet } from 'react-native';
import { COLOR_BLACK, COLOR_WHITE } from '../../../styles';

export default StyleSheet.create({
  containerStyle: {
    backgroundColor: COLOR_BLACK,
    borderRadius: 5,
    opacity: 0.8,
    padding: 10
  },
  defaultStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0
  },
  shadowStyle: {
    elevation: 10,
    shadowColor: COLOR_BLACK,
    shadowOffset: {
      width: 4,
      height: 4
    },
    shadowOpacity: 0.8,
    shadowRadius: 6
  },
  textStyle: {
    color: COLOR_WHITE,
    fontSize: 16,
    textAlign: 'center'
  }
});
