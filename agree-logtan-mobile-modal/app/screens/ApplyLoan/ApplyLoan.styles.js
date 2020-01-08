import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_LABEL2,
  COLOR_GREY_60,
  FONT_BODY2,
  COLOR_GREY_90,
  FONT_LABEL1,
  FONT_BODY3
} from '../../styles';

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: COLOR_WHITE
  },
  labelStyle: {
    ...FONT_LABEL1,
    color: COLOR_GREY_60
  },
  smallLabel: {
    ...FONT_LABEL2,
    color: COLOR_GREY_60
  },
  formComponentsContainer: {
    margin: 20
  },
  programBody: {
    ...FONT_BODY2,
    color: COLOR_GREY_90,
    marginTop: 5
  },
  landDataContainer: {
    marginHorizontal: 20
  },
  programTypeContainer: {
    margin: 20
  },
  loanAmountContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10
  },
  periodePickerContainer: {
    marginHorizontal: 20
  },
  agreementOuterContainer: {
    marginVertical: 20,
    marginRight: 10
  },
  agreementContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  agreementText: {
    ...FONT_BODY3,
    color: COLOR_GREY_90,
    textAlign: 'justify'
  }
});

export default styles;
