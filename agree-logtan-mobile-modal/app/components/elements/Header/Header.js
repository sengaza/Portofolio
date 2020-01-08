import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Header.styles';
import BackButton from '../BackButton';
import BurgerButton from '../BurgerButton';
import History from '../../../../assets/svgs/History';
import Setting from '../../../../assets/svgs/Setting';
import Search from '../../../../assets/svgs/Search';

export default class Header extends React.Component {
  _renderLeft = () => {
    const { burger, back, leftComponent, leftContainerStyle } = this.props;
    let LeftComponent = <View />;
    if (burger) {
      LeftComponent = <BurgerButton />;
    } else if (back) {
      LeftComponent = <BackButton />;
    } else if (leftComponent) {
      LeftComponent = leftComponent;
    }
    return (
      <View style={[styles.leftRightContainer, leftContainerStyle, styles.leftContainerStyle]}>
        {LeftComponent}
      </View>
    );
  };

  _renderCenter = () => {
    const { title, centerComponent, centerContainerStyle } = this.props;
    return (
      <View style={[styles.centerContainer, centerContainerStyle]}>
        {title ? this._renderTitle(title) : centerComponent}
      </View>
    );
  };

  _renderTitle = title => <Text style={styles.title}>{title}</Text>;

  _renderRight = () => {
    const { history, setting, search, rightComponent, rightContainerStyle } = this.props;
    let RightComponent = <View />;
    if (setting) {
      RightComponent = <Setting />;
    } else if (search) {
      RightComponent = <Search />;
    } else if (history) {
      RightComponent = <History />;
    } else if (rightComponent) {
      RightComponent = rightComponent;
    }
    return (
      <View style={[styles.leftRightContainer, rightContainerStyle, styles.rightContainerStyle]}>
        {RightComponent}
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topContainer}>
          {this._renderLeft()}
          {this._renderRight()}
        </View>
        <View style={styles.bottomContainer}>{this._renderCenter()}</View>
      </View>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  leftContainerStyle: PropTypes.object,
  centerContainerStyle: PropTypes.object,
  rightContainerStyle: PropTypes.object,
  leftComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  centerComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  rightComponent: PropTypes.oneOfType([PropTypes.element, PropTypes.any]),
  burger: PropTypes.bool,
  back: PropTypes.bool,
  setting: PropTypes.bool,
  history: PropTypes.bool
};

Header.defaultProps = {
  title: '',
  leftContainerStyle: {},
  centerContainerStyle: {},
  rightContainerStyle: {},
  leftComponent: <View />,
  centerComponent: <View />,
  rightComponent: <View />,
  burger: false,
  back: true,
  setting: false,
  history: false
  // search: false
};
