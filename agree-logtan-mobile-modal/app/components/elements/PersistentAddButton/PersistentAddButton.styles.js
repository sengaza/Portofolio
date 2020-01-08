import { StyleSheet } from 'react-native';

import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_TRANSPARENT,
  COLOR_WHITE,
  FONT_BUTTON,
  COLOR_EVENT_DISABLED,
  COLOR_FONT_DISABLED
} from '../../../styles';

const container = {
  width: '100%',
  height: 55,
  justifyContent: 'center',
  alignItems: 'center',
  borderTopLeftRadius: 7,
  borderTopRightRadius: 7
};

export default StyleSheet.create({
  button: {
    lineHeight: 40
  },
  buttonPressed: {
    ...container,
    backgroundColor: COLOR_BASE_PRIMARY_DARK
  },
  container: {
    ...container,
    flexDirection: 'row',
    backgroundColor: COLOR_BASE_PRIMARY_MAIN
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerDisabled: {
    ...container,
    flexDirection: 'row',
    backgroundColor: COLOR_EVENT_DISABLED
  },
  containerFlat: {
    backgroundColor: COLOR_TRANSPARENT,
    ...container
  },
  containerPressed: {
    ...container,
    backgroundColor: COLOR_BASE_PRIMARY_DARK
  },
  text: {
    ...FONT_BUTTON,
    color: COLOR_WHITE
  },
  textDisabled: {
    ...FONT_BUTTON,
    color: COLOR_FONT_DISABLED
  },
  textPressed: {
    ...FONT_BUTTON,
    color: COLOR_WHITE
  }
});
