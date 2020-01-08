import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { noop } from '../../../utils';
import Check from '../../../../assets/svgs/Check';
import { COLOR_WHITE } from '../../../styles';

export default class Component extends React.Component {
  _renderRadioButtonCheckbox = () => {
    const { selected = false, disabled, type, circleStyle } = this.props;
    return (
      <View style={[styles.checkbox(selected, disabled, type), circleStyle]}>
        {selected && (
          <View style={styles.containerIcon}>
            <Check width={18} height={18} color={COLOR_WHITE} />
          </View>
        )}
      </View>
    );
  };

  _renderRadioButtonLabel = () => {
    const { name = '', labelStyle } = this.props;
    return <Text style={[styles.label, labelStyle]}>{name}</Text>;
  };

  _renderRadioButton = () => {
    const { containerStyle, shiftedLabel = true } = this.props;

    return shiftedLabel ? (
      <View style={[styles.container, containerStyle]}>
        {this._renderRadioButtonCheckbox()}
        {this._renderRadioButtonLabel()}
      </View>
    ) : (
      <View style={[styles.container, containerStyle]}>
        {this._renderRadioButtonLabel()}
        {this._renderRadioButtonCheckbox()}
      </View>
    );
  };

  _onSelect = () => {
    const { onSelect = noop, name: selectingName, value } = this.props;
    onSelect(selectingName, value);
  };

  render() {
    const { disabled } = this.props;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this._onSelect}
        activeOpacity={1}
        disabled={disabled}
      >
        {this._renderRadioButton()}
      </TouchableOpacity>
    );
  }
}

Component.propTypes = {
  name: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  circleStyle: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  containerStyle: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  labelStyle: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  shiftedLabel: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['square', 'circle'])
};

Component.defaultProps = {
  labelStyle: {},
  circleStyle: {},
  containerStyle: {},
  shiftedLabel: true,
  disabled: false,
  type: 'square'
};
