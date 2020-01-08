import React from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styles from './FarmerCard.styles';
import images from '../../../configs/images';
import Ellipse from '../../../../assets/svgs/Ellipse';
import I18n from '../../../i18n';
// import Detail from '../../../../assets/svgs/Detail';
// import { noop } from '../../../utils';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { topLeft, bottomLeft, farmerImage, topRight } = this.props;
    return (
      <TouchableOpacity style={styles.outerContainer} {...this.props}>
        <View style={styles.container} activeOpacity={0.8}>
          {/* {this._renderAva()} */}
          <View>
            {farmerImage === '' ? (
              <Image source={images.ava} style={styles.imageLeft} resizeMode="cover" />
            ) : (
              <Image source={{ uri: farmerImage }} style={styles.imageLeft} resizeMode="cover" />
            )}
          </View>
          <View style={styles.leftCard}>
            <View style={styles.topPart}>
              <Text style={styles.nameText}>{topLeft}</Text>
            </View>

            <View style={styles.bottomPart}>
              <Text style={styles.nikText}>{I18n.t('nik')}</Text>
              <Text style={styles.nikNumber}>{bottomLeft}</Text>
            </View>
          </View>
          {topRight !== '' && (
            <View style={styles.rightCard}>
              <View style={styles.topRightPart}>
                <Ellipse type={topRight} />
                <Text style={styles.statusText} allowFontScaling>
                  {I18n.t(`prestatus.${topRight}`)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}

Card.propTypes = {
  farmerImage: PropTypes.string,
  // onPress: PropTypes.func,
  topRight: PropTypes.string,
  topLeft: PropTypes.string,
  bottomLeft: PropTypes.string
};

Card.defaultProps = {
  farmerImage: '',
  // onPress: noop,
  topRight: '',
  topLeft: '',
  bottomLeft: ''
};
