import { StyleSheet } from 'react-native';
import {
  COLOR_WHITE,
  FONT_LABEL1,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_GREY_60,
  FONT_LABEL2,
  FONT_BODY2,
  COLOR_GREY_90
} from '../../../styles';

const styles = StyleSheet.create({
  cardTitleText: {
    ...FONT_LABEL1,
    color: COLOR_BASE_PRIMARY_DARK,
    marginBottom: 20,
    marginTop: 20
  },
  cardContainer: {
    backgroundColor: COLOR_WHITE,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardPartContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  cardPart: {
    flex: 1,
    marginBottom: 20
  },
  label: {
    ...FONT_LABEL2,
    color: COLOR_GREY_60
  },
  body: {
    ...FONT_BODY2,
    color: COLOR_GREY_90
  }
});

export default styles;
