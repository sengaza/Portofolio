import React, { Component } from 'react';
import { Text } from 'react-native';

import styles from './LinkButton.styles';
import { noop } from '../../../utils';

class LinkButton extends Component {
  render() {
    const { title, onPress = noop, customButtonStyle } = this.props;
    const buttonStyle = styles.button;

    return (
      <Text onPress={onPress} style={[buttonStyle, customButtonStyle]}>
        {title}
      </Text>
    );
  }
}

export default LinkButton;
