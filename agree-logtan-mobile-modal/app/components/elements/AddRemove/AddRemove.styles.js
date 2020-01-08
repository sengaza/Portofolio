import { StyleSheet } from 'react-native';
import { COLOR_GREY_40, FONT_LABEL1, COLOR_GREY_60 } from '../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 150
  },
  textContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: COLOR_GREY_40,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  componentsContainer: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1
  },
  label: {
    ...FONT_LABEL1,
    color: COLOR_GREY_60
  }
});
