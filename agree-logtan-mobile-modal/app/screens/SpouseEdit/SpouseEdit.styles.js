import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_LABEL1,
  COLOR_GREY_60,
  COLOR_GREY_90,
  FONT_BODY1,
  COLOR_GREY_40
} from '../../styles';

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
    marginHorizontal: 20,
    marginVertical: 10
  },
  buttonArea: {
    flex: 0.33,
    backgroundColor: COLOR_WHITE
  },
  button: {
    alignSelf: 'center'
  },
  dobText: {
    ...FONT_BODY1,
    color: COLOR_GREY_90
  },
  dobTextEmpty: {
    ...FONT_BODY1,
    color: COLOR_GREY_40
  },
  dobButton: {
    marginTop: 8,
    alignItems: 'center',
    borderColor: COLOR_GREY_40,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingRight: 10
  }
});

export default styles;
