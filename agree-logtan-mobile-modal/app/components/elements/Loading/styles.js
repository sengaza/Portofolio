import { StyleSheet } from 'react-native';

import { widthByScreen, heightByScreen } from '../../../utils/dimensions';

import { FONT_BODY1, COLOR_BLACK_OPACITY50, COLOR_WHITE } from '../../../styles';

const font = {
  ...FONT_BODY1,
  color: COLOR_WHITE
};

const container = {
  width: widthByScreen(100),
  height: heightByScreen(100)
};

const styles = StyleSheet.create({
  container: {
    ...container,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 2
  },
  containerView: {
    alignItems: 'center',
    backgroundColor: COLOR_BLACK_OPACITY50,
    borderRadius: 5,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: widthByScreen(60)
  },
  text: {
    ...font,
    marginLeft: 20
  }
});

export default styles;
