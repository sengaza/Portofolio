import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_LABEL1,
  COLOR_GREY_60,
  COLOR_GREY_90,
  FONT_LABEL2,
  FONT_BODY3,
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
    margin: 20
  },
  formBankNameContainer: {
    marginHorizontal: 20,
    marginTop: 20
  },
  buttonArea: {
    flex: 0.33,
    backgroundColor: COLOR_WHITE
  },
  button: {
    alignSelf: 'center'
  },
  image: {
    borderRadius: 2,
    height: 65,
    width: 65
  },
  listContainer: {
    borderBottomWidth: 1,
    borderColor: COLOR_GREY_40,
    paddingHorizontal: 25,
    flexDirection: 'row',
    height: 100,
    width: '100%',
    alignItems: 'center'
  },
  textTitle: {
    ...FONT_LABEL1,
    color: COLOR_GREY_90,
    width: '75%'
  },
  textHeader: {
    ...FONT_LABEL2,
    color: COLOR_GREY_60
  },
  textDesc: {
    ...FONT_BODY3,
    color: COLOR_GREY_90
  }
});

export default styles;
