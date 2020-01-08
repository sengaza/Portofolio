import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { noop } from '../../../utils';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentTab: 0 };
  }

  _handleTabPressed = index => () => {
    this.setState({ currentTab: index });
    const { onTabChanged = noop } = this.props;
    onTabChanged(index);
  };

  _renderTabHeading = (tabs, currentTab = 0) => {
    const {
      tabContainerStyle,
      tabLabelSelectedStyle,
      bottomLineHighlightStyle,
      bottomLineStyle,
      tabLabelStyle
    } = this.props;
    return tabs.map((tab, index) => {
      const selected = currentTab === index;
      const tabWidth = `${100 / tabs.length}%`;
      const tabSelectedLabel = selected ? [styles.tabLabelSelected, tabLabelSelectedStyle] : [];
      const bottomLineHighlight = selected ? [styles.bottomLineHighlight, bottomLineHighlightStyle] : [];
      return (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          onPress={this._handleTabPressed(index)}
          style={[{ width: tabWidth }, styles.tab, tabContainerStyle]}
        >
          <Text style={[styles.tabLabel, tabLabelStyle, ...tabSelectedLabel]}>{tab.name}</Text>
          <View style={[styles.bottomLine, bottomLineStyle, ...bottomLineHighlight]} />
        </TouchableOpacity>
      );
    });
  };

  _renderTabBar = tabs => {
    const { currentTab } = this.state;
    return <View style={styles.tabBar}>{this._renderTabHeading(tabs, currentTab)}</View>;
  };

  render() {
    const { currentTab } = this.state;
    const { tabsData, tabsContainerStyle } = this.props;

    return (
      <View style={[styles.tabbyContainer, tabsContainerStyle]}>
        {this._renderTabBar(tabsData)}
        {tabsData[currentTab].renderer()}
      </View>
    );
  }
}

Component.propTypes = {
  onTabChanged: PropTypes.func.isRequired,
  tabsData: PropTypes.oneOfType([PropTypes.array, PropTypes.element]).isRequired,
  tabsContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tabContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tabLabelSelectedStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  tabLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  bottomLineHighlightStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  bottomLineStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

Component.defaultProps = {
  tabsContainerStyle: {},
  tabContainerStyle: {},
  tabLabelSelectedStyle: {},
  tabLabelStyle: {},
  bottomLineHighlightStyle: {},
  bottomLineStyle: {}
};
