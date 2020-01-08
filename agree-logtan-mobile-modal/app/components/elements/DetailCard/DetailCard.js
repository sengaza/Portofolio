import React from 'react';
import { Image, View, Text, TouchableOpacity, Linking } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
// import { noop } from '../../../utils';
// import images from '../../../configs/images';
import I18n from '../../../i18n';
import Call from '../../../../assets/svgs/Call';
import Message from '../../../../assets/svgs/Sms';
import images from '../../../configs/images';
import Ellipse from '../../../../assets/svgs/Ellipse';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _renderAva(image) {
    // const { image } = this.props;
    const avaImage = image === '' ? images.ava : { uri: image };
    return <Image source={avaImage} style={styles.imageLeft} resizeMode="cover" />;
  }

  _onCall = phoneNumber => () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  _onSMS = phoneNumber => () => {
    Linking.openURL(`sms:${phoneNumber}`);
  };

  render() {
    const { textTop, textBottom, image, status, phoneNumber } = this.props;
    return (
      <View style={styles.outerContainer}>
        <View style={styles.container} activeOpacity={0.8}>
          {this._renderAva(image)}
          <View style={styles.leftPart}>
            <View style={styles.topPart}>
              <Text style={styles.label}>{I18n.t('nik')}</Text>
              <Text style={styles.text}>{textTop}</Text>
            </View>

            <View style={styles.bottomPart}>
              <Text style={styles.label2}>{I18n.t('phone')}</Text>
              <Text style={styles.text2}>{textBottom}</Text>
            </View>
          </View>
          <View style={styles.rightPart}>
            {status !== '' && (
              <View style={styles.rightTopPart}>
                <Ellipse type={status} />
                <Text style={styles.statusText}>{I18n.t(`prestatus.${status}`)}</Text>
              </View>
            )}
            <View style={styles.rightBottomPart}>
              <TouchableOpacity style={styles.buttonCallMsg} onPress={this._onCall(phoneNumber)}>
                <Call />
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCallMsg} onPress={this._onSMS(phoneNumber)}>
                <Message />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  textTop: PropTypes.string,
  textBottom: PropTypes.string,
  phoneNumber: PropTypes.string,
  status: PropTypes.string
};

Card.defaultProps = {
  image: ' ',
  textTop: '',
  textBottom: '',
  phoneNumber: '',
  status: ''
};
