import { StyleSheet } from 'react-native';
import { COLOR_WHITE, FONT_LABEL1, COLOR_GREY_60 } from '../../styles';

const styles = StyleSheet.create({
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_GREY_60
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  },
  formComponentsContainer: {
    margin: 20
  },
  formMotherNameContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  buttonArea: {
    flex: 0.33,
    backgroundColor: COLOR_WHITE
  },
  button: {
    alignSelf: 'center'
  }
});

export default styles;
