import { StyleSheet } from 'react-native';

import { FONT_LABEL1, FONT_BODY3 } from '../../../styles';

export default StyleSheet.create({
  limitContainer: {
    position: 'absolute',
    overflow: 'hidden',
    left: 20,
    right: 20,
    zIndex: 9999,
    borderRadius: 7
  },
  containerButton: {
    marginTop: 24,
    marginBottom: 18,
    alignItems: 'flex-end'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  imageClose: {
    height: 20,
    width: 20,
    marginRight: 20
  },
  imageWarning: {
    height: 25,
    width: 25,
    marginLeft: 25
  },
  textContainer: {
    flex: 1
  },
  textMsg: {
    ...FONT_BODY3,
    paddingLeft: 20,
    paddingBottom: 14
  },
  titleMsg: {
    ...FONT_LABEL1,
    paddingLeft: 20,
    paddingTop: 14
  },
  actionText: {
    fontSize: 14,
    fontFamily: 'Montserrat-Bold',
    paddingRight: 20,
    paddingTop: 14,
    paddingBottom: 14
  }
});
