import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { noop } from '../../../utils';
import SvgMinusSmall from '../../../../assets/svgs/MinusSmall';
import SvgPlusSmall from '../../../../assets/svgs/PlusSmall';
import styles from './AddRemove.styles';

export default class AddRemove extends React.Component {
  render() {
    const { value, onAdd = noop, onRemove = noop, label, removeDisabled } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.componentsContainer}>
          <TouchableOpacity onPress={onRemove} disabled={removeDisabled}>
            <SvgMinusSmall removeDisabled={removeDisabled} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text>{value}</Text>
          </View>
          <TouchableOpacity onPress={onAdd}>
            <SvgPlusSmall />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
