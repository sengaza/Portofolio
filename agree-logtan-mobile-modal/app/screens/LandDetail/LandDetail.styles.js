import { StyleSheet } from 'react-native';
import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_GREY_60,
  COLOR_GREY_90,
  COLOR_PAGE_BACKGROUND,
  FONT_BODY2,
  FONT_BUTTON,
  FONT_LABEL2
} from '../../styles';
import { scale } from '../../utils/scaling';

const styles = StyleSheet.create({
  cardBody: {
    flex: 1,
    marginBottom: scale(10),
    marginTop: scale(10)
  },
  column: {
    flexDirection: 'row'
  },
  container: {
    backgroundColor: COLOR_PAGE_BACKGROUND,
    flex: 1,
    height: '100%'
  },
  labelText: {
    ...FONT_LABEL2,
    color: COLOR_GREY_60
  },
  landTemplate: {
    borderRadius: 2,
    height: 65,
    width: 65
  },
  valueText: {
    ...FONT_BODY2,
    color: COLOR_GREY_90
  },
  uploadButton: {
    marginRight: 25
  },
  uploadContainer: {
    flexDirection: 'row'
  },
  uploadText: {
    ...FONT_BUTTON,
    color: COLOR_BASE_PRIMARY_MAIN
  },
  uploadTextContainer: {
    alignItems: 'center',
    flexDirection: 'row'
  }
  // uploadSad: {
  //   position: 'absolute',
  //   alignItems: 'center'
  // }
});

export default styles;
