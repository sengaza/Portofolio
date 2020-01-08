import React from 'react';
import { View, StatusBar } from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import styles from './styles';
import { COLOR_WHITE } from '../../styles';

export default class Component extends React.Component {
  _onPress = () => {};

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
  }

  render() {
    return (
      <MainScreen>
        <Header back={false} title="Inbox" search rightContainerStyle={styles.rightContainer} />
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <View style={styles.container}>
          {/* <Button title="title" disabled={false} onPress={this._onPress} type="raised-ripple" /><Love /> */}
        </View>
      </MainScreen>
    );
  }
}
