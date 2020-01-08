import { StyleSheet } from 'react-native';

import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_TRANSPARENT,
  COLOR_WHITE,
  FONT_BUTTON,
  COLOR_EVENT_DISABLED,
  COLOR_FONT_DISABLED,
  COLOR_PAGE_BACKGROUND
} from '../../../styles';

const container = {
  width: 200,
  height: 48,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 5
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
    backgroundColor: COLOR_BASE_PRIMARY_MAIN
  },
  containerSecondary: {
    ...container,
    backgroundColor: COLOR_PAGE_BACKGROUND
  },
  containerDisabled: {
    ...container,
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
  textSecondary: {
    ...FONT_BUTTON,
    color: COLOR_BASE_PRIMARY_MAIN
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
