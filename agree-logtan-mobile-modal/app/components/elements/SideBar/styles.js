import { StyleSheet } from 'react-native';

import { COLOR_WHITE, COLOR_BASE_PRIMARY_MAIN, FONT_BODY2, FONT_BODY1 } from '../../../styles';

export default StyleSheet.create({
  card: {
    alignItems: 'flex-start',
    backgroundColor: COLOR_BASE_PRIMARY_MAIN,
    height: 150,
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 10
  },
  container: {
    flex: 1
  },
  label: {
    color: COLOR_WHITE,
    ...FONT_BODY2,
    marginBottom: 5,
    paddingHorizontal: 5
  },
  title: {
    color: COLOR_WHITE,
    ...FONT_BODY1,
    paddingHorizontal: 5
  }
});
