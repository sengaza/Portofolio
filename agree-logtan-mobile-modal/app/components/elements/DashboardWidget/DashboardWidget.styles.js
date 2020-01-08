import { StyleSheet } from 'react-native';
import {
  COLOR_GREY_90,
  FONT_HEADLINE4,
  FONT_OVERLINE1,
  FONT_LABEL1,
  COLOR_BASE_PRIMARY_DARK
} from '../../../styles/';

const fontWidgetHeader = {
  ...FONT_LABEL1,
  color: COLOR_BASE_PRIMARY_DARK,
  textAlign: 'left'
};

const fontWidgetContentTitle = {
  opacity: 1,
  ...FONT_HEADLINE4,
  letterSpacing: 0,
  textAlign: 'center',
  color: COLOR_GREY_90
};

const fontWidgetContentBody = {
  opacity: 1,
  ...FONT_OVERLINE1,
  textAlign: 'center',
  color: COLOR_GREY_90
};

export default StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    elevation: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    minHeight: 130,
    minWidth: 319,
    borderWidth: 0
  },
  linearWrapper: {
    flex: 1,
    alignSelf: 'center',
    flexDirection: 'column',
    borderWidth: 0,
    borderRadius: 7
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  nextIconWrapper: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 20
  },
  nextIcon: {
    // alignSelf: 'flex-end',
    // resizeMode: 'stretch',
    // height: '100%',
    // width: '30%'
  },
  headerWrapper: {
    width: '70%',
    marginLeft: 20,
    marginRight: 20
  },
  header: {
    ...fontWidgetHeader
  },
  cardBody: {
    flex: 6,
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  content: {
    flex: 2,
    marginTop: -20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  top: {
    ...fontWidgetContentTitle,
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'bottom'
  },
  bottom: {
    ...fontWidgetContentBody,
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'top'
  }
});
