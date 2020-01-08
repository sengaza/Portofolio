import React from 'react';
import { TouchableOpacity, TouchableNativeFeedback, Text, View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styles from '././PersistentAddButton.styles';
import { noop } from '../../../utils';
import PlusSign from '../../../../assets/svgs/Plus';

export default class PersistentAddButton extends React.Component {
  _renderLeft = () => {
    const { left, disabled } = this.props;
    let LeftComponent = <View />;
    if (left) {
      LeftComponent = <PlusSign disabled={disabled} />;
    }
    return <View style={styles.leftContainer}>{LeftComponent}</View>;
  };

  _renderCenter = () => {
    const { title, disabled } = this.props;
    let textStyle = styles.text;
    if (disabled) {
      textStyle = styles.textDisabled;
    }
    return (
      <View style={styles.centerContainer}>
        <Text style={textStyle}>{title}</Text>
      </View>
    );
  };

  _renderRight = () => {
    const { right, disabled } = this.props;
    let RightComponent = <View />;
    if (right) {
      RightComponent = <PlusSign disabled={disabled} />;
    }
    return <View style={styles.rightContainer}>{RightComponent}</View>;
  };

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
      <ComponentView disabled={disabled} style={[containerStyle, customContainer]} onPress={onPress}>
        <View style={[containerStyle, customContainer]}>
          {this._renderLeft()}
          {this._renderCenter()}
          {this._renderRight()}
        </View>
      </ComponentView>
    );
  }
}

PersistentAddButton.propTypes = {
  disabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  customContainer: PropTypes.object,
  type: PropTypes.oneOf(['flat', 'flat-ripple', 'raised', 'raised-ripple']),
  left: PropTypes.object,
  right: PropTypes.object
};

PersistentAddButton.defaultProps = {
  disabled: false,
  customContainer: {},
  type: 'raised',
  left: false,
  right: false
};
