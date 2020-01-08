import React from 'react';
import { View, Text, Image } from 'react-native';
import Modal from 'react-native-modal';
import PropTypes from 'prop-types';
import PrimaryButton from '../PrimaryButton';

import styles from './styles';
import { IMAGES } from '../../../configs';
import { noop } from '../../../utils';
import { COLOR_GREY_40 } from '../../../styles';

export default class ModalConfirmation extends React.Component {
  render() {
    const { title, description, onPressNo, onPressYes, type, leftOption, rightOption } = this.props;
    return (
      <Modal {...this.props} style={{ margin: 0 }} backdropColor={COLOR_GREY_40} backdropOpacity={0.5}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={styles.container}>
            <Image
              source={type === true ? IMAGES.correct : IMAGES.warningYellow}
              style={styles.imageWarning}
              resizeMode="contain"
            />
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.descText}>{description}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              {type === true ? null : (
                <PrimaryButton
                  onPress={onPressNo}
                  customContainer={styles.button}
                  size="medium"
                  title={leftOption}
                  type="secondary"
                />
              )}
              <PrimaryButton
                onPress={onPressYes}
                customContainer={styles.button}
                size="medium"
                title={rightOption}
              />
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

ModalConfirmation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  onPressNo: PropTypes.func,
  onPressYes: PropTypes.func,
  type: PropTypes.bool,
  leftOption: PropTypes.string,
  rightOption: PropTypes.string
};

ModalConfirmation.defaultProps = {
  title: 'Title',
  description: 'Description',
  onPressNo: noop,
  onPressYes: noop,
  type: false,
  leftOption: 'Tidak',
  rightOption: 'Ya'
};
