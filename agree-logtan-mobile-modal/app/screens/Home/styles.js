import { StyleSheet } from 'react-native';
import {
  COLOR_PAGE_BACKGROUND,
  FONT_HEADLINE5,
  COLOR_GREY_90,
  FONT_HEADLINE6,
  COLOR_BASE_PRIMARY_DARK
} from '../../styles';
import { scale } from '../../utils/scaling';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollWrapper: {
    flex: 1,
    backgroundColor: COLOR_PAGE_BACKGROUND
  },
  backgroundImage: {
    resizeMode: 'contain',
    width: '85%',
    height: scale(600),
    alignSelf: 'center'
  },
  statusbar: {
    height: 56,
    width: '100%'
  },
  imageLayout: {
    width: '100%'
  },
  widgetContainer: {
    width: '100%',
    zIndex: 1,
    position: 'absolute',
    bottom: 0
  },
  nameAndTitleContainer: {
    justifyContent: 'flex-start',
    zIndex: 1,
    position: 'absolute',
    top: 80,
    bottom: 0,
    left: 30,
    right: 0,
    marginTop: 20,
    marginLeft: 20
  },
  userStateWrapper: {
    // alignContent: 'center'
  },
  userName: {
    ...FONT_HEADLINE6,
    color: COLOR_BASE_PRIMARY_DARK,
    bottom: 5
  },
  welcome: {
    ...FONT_HEADLINE5,
    color: COLOR_GREY_90
  }
});

export default styles;
