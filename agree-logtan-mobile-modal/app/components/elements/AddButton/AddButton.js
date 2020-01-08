import React from 'react';
import { View, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles from './AddButton.styles';
import SvgPlus from '../../../../assets/svgs/Plus';
import { noop } from '../../../utils';

export default class AddButton extends React.Component {
  render() {
    const { onPress = noop, disabled, type, customContainer } = this.props;
    let containerStyle = styles.container;
    let ComponentView = TouchableOpacity;
    if (type.match(/flat-ripple|raised-ripple/) && Platform.OS === 'android') {
      ComponentView = TouchableNativeFeedback;
    }
    if (type.match(/flat|flat-ripple/)) {
      containerStyle = styles.containerFlat;
    }
    if (disabled) {
      containerStyle = styles.containerDisabled;
    }
    return (
      <ComponentView
        activeOpacity={0.2}
        disabled={disabled}
        style={[containerStyle, customContainer]}
        onPress={onPress}
      >
        <View style={styles.circleContainer}>
          <View style={styles.circle}>
            <SvgPlus />
          </View>
        </View>
      </ComponentView>
    );
  }
}

AddButton.propTypes = {
  disabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  customContainer: PropTypes.object,
  type: PropTypes.oneOf(['flat', 'flat-ripple', 'raised', 'raised-ripple'])
};

AddButton.defaultProps = {
  disabled: false,
  customContainer: {},
  type: 'raised'
};
