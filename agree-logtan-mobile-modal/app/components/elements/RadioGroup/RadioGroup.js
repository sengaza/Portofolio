import React, { Component } from 'react';
import { View } from 'react-native';
import RadioButton from '../RadioButton';
import styles from './RadioGroup.styles';
import { noop } from '../../../utils';

class RadioGroup extends Component {
  render() {
    const { options = [], selectedIndex = 0, spaceBetween = 0, onSelect = noop, disabled } = this.props;
    return (
      <View style={styles.container}>
        {options.map((option, index) => {
          const selected = selectedIndex === index;
          return (
            <RadioButton
              containerStyle={index !== 0 && { marginLeft: spaceBetween }}
              key={option.id}
              index={index}
              name={option.name}
              value={option.id}
              selected={selected}
              onSelect={onSelect}
              labelStyle={disabled && styles.labelStyle}
              circleStyle={disabled && styles.circleStyle}
              selectedStyle={disabled && styles.selectedStyle}
              disabled={disabled}
            />
          );
        })}
      </View>
    );
  }
}

export default RadioGroup;
