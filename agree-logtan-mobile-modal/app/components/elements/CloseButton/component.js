import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import Close from '../../../../assets/svgs/CloseBlack';

export default class Component extends React.Component {
  render() {
    const { onPress } = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Close />
      </TouchableOpacity>
    );
  }
}

Component.propTypes = {
  onPress: PropTypes.object
};

Component.defaultProps = {
  onPress: PropTypes.object
};
