import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';

import styles from './styles';
import { COLOR_GREY_40 } from '../../../styles';
import SvgCheckList from '../../../../assets/svgs/CheckList';

export default class ModalConfirmation extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <Modal {...this.props} style={{ margin: 0 }} backdropColor={COLOR_GREY_40} backdropOpacity={0.5}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.container}>
            {data.map(value => (
              <TouchableOpacity style={styles.listContainer} key={value.id} onPress={this._onPress(value)}>
                <Text style={styles.textList}>{value.name}</Text>
                <SvgCheckList />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    );
  }
}

ModalConfirmation.propTypes = {
  data: PropTypes.object
};

ModalConfirmation.defaultProps = {
  data: [{ name: 'Name', id: '0' }, { name: 'Name', id: '1' }]
};
