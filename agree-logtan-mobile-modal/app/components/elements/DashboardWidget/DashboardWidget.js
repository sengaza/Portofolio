import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TouchableHighlight } from 'react-native';
import I18n from '../../../i18n';
import styles from './DashboardWidget.styles';
import { toTitleCase, noop } from '../../../utils';
import { COLOR_PAGE_BACKGROUND } from '../../../styles';
import SvgArrowRightBlue from '../../../../assets/svgs/ArrowRightBlue';

class DashboardWidget extends Component {
  _renderContent = ({ title = '', content = '' }) => {
    const words = I18n.t(title).split(' ');
    const [head, ...tail] = words;
    const name = toTitleCase(`${head}\r\n${tail.join(' ')}`);
    const number = `${content}`;
    return (
      <View style={styles.content} key={name}>
        <Text style={styles.top}>{number}</Text>
        <Text style={styles.bottom}>{name}</Text>
      </View>
    );
  };

  _renderCardHeader = ({ title = '' }) => {
    const { buttonAction } = this.props;
    return (
      <View style={styles.cardHeader} onPress={buttonAction}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>{`${title}`}</Text>
        </View>
        <View style={styles.nextIconWrapper}>
          <SvgArrowRightBlue />
        </View>
      </View>
    );
  };

  _renderCardBody = data => {
    const displayingContent = Object.keys(data).map(title =>
      this._renderContent({ title, content: data[title] })
    );

    return <View style={styles.cardBody}>{displayingContent}</View>;
  };

  render() {
    const {
      cardStyle = {},
      gradient = {},
      displayingData = {},
      cardHeader = {},
      buttonAction = noop
    } = this.props;
    const { start = {}, end = {}, location = [], colors = [] } = gradient;
    return (
      <TouchableHighlight
        activeOpacity={0.2}
        underlayColor={COLOR_PAGE_BACKGROUND}
        style={[styles.container, cardStyle]}
        onPress={buttonAction}
      >
        <LinearGradient
          style={styles.linearWrapper}
          start={start}
          end={end}
          locations={location}
          colors={colors}
        >
          {this._renderCardHeader(cardHeader)}
          {this._renderCardBody(displayingData)}
        </LinearGradient>
      </TouchableHighlight>
    );
  }
}

export default DashboardWidget;
