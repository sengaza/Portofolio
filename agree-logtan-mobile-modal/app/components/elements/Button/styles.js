import { StyleSheet } from 'react-native';

import {
  COLOR_BASE_PRIMARY_MAIN,
  COLOR_BASE_PRIMARY_LIGHT,
  COLOR_BASE_PRIMARY_DARK,
  COLOR_FONT_PRIMARY_LIGHT,
  COLOR_TRANSPARENT
} from '../../../styles';

const container = {
  width: 200,
  height: 40,
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
  containerDisabled: {
    ...container,
    backgroundColor: COLOR_BASE_PRIMARY_LIGHT
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
    color: COLOR_FONT_PRIMARY_LIGHT
  },
  textDisabled: {
    color: COLOR_FONT_PRIMARY_LIGHT
  },
  textPressed: {
    color: COLOR_FONT_PRIMARY_LIGHT
  }
});
