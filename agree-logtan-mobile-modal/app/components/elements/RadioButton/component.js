import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { noop } from '../../../utils';
import I18n from '../../../i18n';

class RadioButton extends Component {
  _renderRadioButtonCircle = () => {
    const { selected = false, circleStyle, selectedStyle } = this.props;
    return (
      <View style={[styles.circle, circleStyle]}>
        {selected && <View style={[styles.selected, selectedStyle]} />}
      </View>
    );
  };

  _renderRadioButtonLabel = () => {
    const { name = '', labelStyle } = this.props;
    return <Text style={[styles.label, labelStyle]}>{I18n.t(name)}</Text>;
  };

  _renderRadioButton = () => {
    const { containerStyle, shiftedLabel = true } = this.props;

    return shiftedLabel ? (
      <View style={[styles.container, containerStyle]}>
        {this._renderRadioButtonCircle()}
        {this._renderRadioButtonLabel()}
      </View>
    ) : (
      <View style={[styles.container, containerStyle]}>
        {this._renderRadioButtonLabel()}
        {this._renderRadioButtonCircle()}
      </View>
    );
  };

  _onSelect = () => {
    const { onSelect = noop, index, name, value } = this.props;
    const selectingName = I18n.t(name);
    onSelect(index, selectingName, value);
  };

  render() {
    const { disabled } = this.props;
    return (
      <TouchableOpacity
        disabled={disabled}
        style={styles.container}
        onPress={this._onSelect}
        activeOpacity={1}
      >
        {this._renderRadioButton()}
      </TouchableOpacity>
    );
  }
}

export default RadioButton;
