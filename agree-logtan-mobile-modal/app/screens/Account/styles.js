import { StyleSheet } from 'react-native';
import { COLOR_GREY, FONT_BODY1, COLOR_GREY_90, COLOR_PAGE_BACKGROUND, FONT_LABEL1 } from '../../styles';

const styles = StyleSheet.create({
  bottomLineStyle: {
    height: 4
  },
  container: {
    // alignItems: 'center',
    backgroundColor: COLOR_PAGE_BACKGROUND,
    flex: 1
    // justifyContent: 'center'
  },
  // containerInsideTab: {
  //   alignItems: 'center',
  //   flex: 1,
  //   justifyContent: 'center'
  // },
  // tabContainer: {
  //   borderBottomColor: COLOR_GREY,
  //   borderBottomWidth: 1
  // },
  // tabLabelStyle: {
  //   ...FONT_BODY1,
  //   color: COLOR_GREY
  // },
  // tabSelectedLabel: {
  //   ...FONT_BODY1,
  //   color: COLOR_GREY_DARK
  // },
  // leftContainer: {
  //   alignItems: 'flex-start',
  //   marginLeft: 20
  // },
  // rightContainer: {
  //   alignItems: 'flex-end',
  //   marginRight: 20
  // },
  headerCol: {
    color: COLOR_GREY_90,
    ...FONT_LABEL1
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  signOut: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 10,
    justifyContent: 'center'
  },
  column: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 1,
    borderColor: COLOR_GREY,
    justifyContent: 'center',
    alignContent: 'center'
  },
  link: {
    ...FONT_BODY1,
    textAlign: 'left'
  }
});

export default styles;
