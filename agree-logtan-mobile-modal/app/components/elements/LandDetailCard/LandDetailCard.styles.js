import { StyleSheet } from 'react-native';
import { COLOR_BASE_PRIMARY_DARK, COLOR_WHITE, FONT_LABEL1 } from '../../../styles';
import { scale } from '../../../utils/scaling';

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  cardContainer: {
    backgroundColor: COLOR_WHITE,
    marginBottom: scale(10),
    padding: 20
  },
  heading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(18)
  },
  title: {
    ...FONT_LABEL1,
    color: COLOR_BASE_PRIMARY_DARK
  }
});

export default styles;
