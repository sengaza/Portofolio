import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './LandCard.styles';
import images from '../../../configs/images';
import I18n from '../../../i18n';

export default class LandCard extends React.Component {
  _renderBottomText(label, value) {
    return (
      <View style={styles.bottomPartItem}>
        <Text style={styles.bottomLabelText}>{I18n.t(label)}</Text>
        <Text style={styles.bottomValueText}>{value || '-'}</Text>
      </View>
    );
  }

  render() {
    const { topText, bottomLeftText, bottomRightText, image } = this.props;
    const landImage = image ? { uri: image } : images.emptyLand;

    return (
      <TouchableOpacity style={styles.outerContainer} {...this.props}>
        <View style={styles.container} activeOpacity={0.8}>
          <View>
            <Image source={landImage} style={styles.imageLeft} resizeMode="contain" />
          </View>
          <View style={styles.leftCard}>
            <View style={styles.topPart}>
              <Text style={styles.landText}>{topText}</Text>
            </View>
            <View style={styles.bottomPart}>
              {this._renderBottomText('size', bottomLeftText && `${bottomLeftText} m2`)}
              {this._renderBottomText('plantingSeason', bottomRightText)}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

LandCard.propTypes = {
  bottomLeftText: PropTypes.string,
  bottomRightText: PropTypes.string,
  image: PropTypes.string,
  topText: PropTypes.string
};

LandCard.defaultProps = {
  bottomLeftText: '',
  bottomRightText: '',
  image: '',
  topText: ''
};
