import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './LandDetailCard.styles';
import SvgEdit from '../../../../assets/svgs/Edit';

export default class LandDetailCard extends React.Component {
  render() {
    const { children, onPressEdit, title } = this.props;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.heading}>
          <Text style={styles.title}>{title}</Text>
          <TouchableOpacity onPress={onPressEdit} style={styles.buttonContainer}>
            {onPressEdit ? <SvgEdit /> : <View />}
          </TouchableOpacity>
        </View>
        {children}
      </View>
    );
  }
}

LandDetailCard.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
};

LandDetailCard.defaultProps = {
  children: null,
  title: ''
};
