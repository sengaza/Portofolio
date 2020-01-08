import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './ProgressCard.styles';
import { noop } from '../../../utils';
import { COLOR_BASE_PRIMARY_LIGHT, COLOR_ICON_DISABLED } from '../../../styles';
import SvgTick from '../../../../assets/svgs/Tick';

export default class ProgressCard extends React.Component {
  render() {
    const { onPress = noop, number, title, subtitle, dataCompleted } = this.props;
    const backgroundColor = dataCompleted === 100 ? COLOR_BASE_PRIMARY_LIGHT : COLOR_ICON_DISABLED;
    const zeroData = dataCompleted === 0;
    const width = dataCompleted === 100 ? 0 : dataCompleted;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.circleContainer}>
            <View style={[styles.circle, { backgroundColor }]}>
              {!zeroData && width === 0 ? <SvgTick /> : <Text style={styles.circleText}>{number}</Text>}
            </View>
          </View>
          <View style={styles.centerToRightContainer}>
            <View style={styles.titleAndDataContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>

              <View style={styles.dataContainer}>
                {!zeroData && width === 0 ? (
                  <View style={[styles.progressFilled, { width }]} />
                ) : (
                  <View style={styles.progressFilled} />
                )}
                <View style={[styles.progress, { width }]} />

                {/* <Text>{dataCompleted}</Text> */}
              </View>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subTitle}>{subtitle}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

ProgressCard.propTypes = {
  // onPress = noop, number, title, subtitle, dataCompleted
  dataCompleted: PropTypes.number
};

ProgressCard.defaultProps = {
  dataCompleted: 0
};
