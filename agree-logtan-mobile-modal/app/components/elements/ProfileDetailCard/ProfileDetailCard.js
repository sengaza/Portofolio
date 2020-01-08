/* eslint-disable no-plusplus */
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './ProfileDetailCard.styles';
import { noop } from '../../../utils';
import SvgEdit from '../../../../assets/svgs/Edit';

export default class ProfileDetailCard extends React.Component {
  render() {
    const { cardTitle, fields, customContainerStyle, onPressEdit = noop } = this.props;
    let index = -1;
    const fieldsLength = fields.length;
    return (
      <View style={[styles.cardContainer, customContainerStyle]}>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitleText}>{cardTitle}</Text>
          <TouchableOpacity onPress={onPressEdit} style={styles.buttonContainer}>
            {onPressEdit ? <SvgEdit /> : <View />}
          </TouchableOpacity>
        </View>

        {++index < fieldsLength && fields[index].label !== '' && (
          <View style={styles.cardPartContainer}>
            <View style={styles.cardPart}>
              <Text style={styles.label}>{fields[index].label}</Text>
              <Text style={styles.body}>{fields[index].body}</Text>
            </View>
            {++index < fieldsLength && fields[index].label !== '' && (
              <View style={styles.cardPart}>
                <Text style={styles.label}>{fields[index].label}</Text>
                <Text style={styles.body}>{fields[index].body}</Text>
              </View>
            )}
          </View>
        )}
        {++index < fieldsLength && fields[index].label !== '' && (
          <View style={styles.cardPartContainer}>
            <View style={styles.cardPart}>
              <Text style={styles.label}>{fields[index].label}</Text>
              <Text style={styles.body}>{fields[index].body}</Text>
            </View>
            {++index < fieldsLength && fields[index].label !== '' && (
              <View style={styles.cardPart}>
                <Text style={styles.label}>{fields[index].label}</Text>
                <Text style={styles.body}>{fields[index].body}</Text>
              </View>
            )}
          </View>
        )}

        {++index < fieldsLength && fields[index].label !== '' && (
          <View style={styles.cardPartContainer}>
            <View style={styles.cardPart}>
              <Text style={styles.label}>{fields[index].label}</Text>
              <Text style={styles.body}>{fields[index].body}</Text>
            </View>
            {++index < fieldsLength && fields[index].label !== '' && (
              <View style={styles.cardPart}>
                <Text style={styles.label}>{fields[index].label}</Text>
                <Text style={styles.body}>{fields[index].body}</Text>
              </View>
            )}
          </View>
        )}
        {++index < fieldsLength && fields[index].label !== '' && (
          <View style={styles.cardPartContainer}>
            <View style={styles.cardPart}>
              <Text style={styles.label}>{fields[index].label}</Text>
              <Text style={styles.body}>{fields[index].body}</Text>
            </View>
            {++index < fieldsLength && fields[index].label !== '' && (
              <View style={styles.cardPart}>
                <Text style={styles.label}>{fields[index].label}</Text>
                <Text style={styles.body}>{fields[index].body}</Text>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
}

ProfileDetailCard.propTypes = {
  cardTitle: PropTypes.string,
  fields: PropTypes.array,
  customContainerStyle: PropTypes.object
};

ProfileDetailCard.defaultProps = {
  cardTitle: '-',
  fields: [],
  customContainerStyle: {}
};
