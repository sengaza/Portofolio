import React from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import LinkButton from '../../components/elements/LinkButton';
import styles from './styles';
import { COLOR_WHITE } from '../../styles';
import I18n from '../../i18n';
import { STORAGE_KEY } from '../../constants';

export default class Component extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     tabIndex: 0
  //   };
  // }

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
  }

  _onPress = () => {};

  // _getTabData = () => [
  //   {
  //     name: 'Tab A',
  //     renderer: this._renderTab
  //   },
  //   {
  //     name: 'Tab B',
  //     renderer: this._renderTab
  //   }
  // ];

  // _onTabChanged = index => {
  //   this.setState({ tabIndex: index });
  // };

  // _renderTab = () => {
  //   const { tabIndex } = this.state;
  //   return (
  //     <View style={styles.containerInsideTab}>
  //       <Text>{`Tab Index : ${tabIndex}`}</Text>
  //       <Button title="title" disabled={false} onPress={this._onPress} type="raised-ripple" />
  //     </View>
  //   );
  // };

  _renderHelp() {
    return (
      <View style={styles.column}>
        <Text style={styles.headerCol}>{I18n.t('help')}</Text>
        <LinkButton
          title={I18n.t('helpCenter')}
          customButtonStyle={styles.link}
          onPress={this._onTouchHelp}
        />
        <LinkButton
          title={I18n.t('reportAProblem')}
          customButtonStyle={styles.link}
          onPress={this._onTouchHelp}
        />
      </View>
    );
  }

  _renderSignOut() {
    return (
      <View style={styles.signOut}>
        <TouchableOpacity style={styles.row} onPress={this._onSignOut}>
          {/* <Image source={images.logout} style={styles.image} /> */}
          <Text style={styles.link}>{I18n.t('logOut')}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onSignOut = async () => {
    // await auth.logout();
    // const result = await multipleAccounts.removeOneUser();
    // if (!_.has(result, 'data')) {
    await AsyncStorage.removeItem(STORAGE_KEY.TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEY.PROFILE);
    this.props.navigation.navigate('Login');
    // } else {
    //   this.props.navigation.navigate('Dashboard', { reset: true });
    // }
  };

  _renderAbout() {
    return (
      <View style={styles.column}>
        <Text style={styles.headerCol}>{I18n.t('about')}</Text>
        <LinkButton
          title={I18n.t('privacyPolicy')}
          customButtonStyle={styles.link}
          onPress={this._onTouchPrivacyPolicy}
        />
        <LinkButton
          title={I18n.t('termAndConditions')}
          customButtonStyle={styles.link}
          onPress={this._onTouchTermsAndConditions}
        />
        <LinkButton title={I18n.t('checkUpdate')} customButtonStyle={styles.link} />
      </View>
    );
  }

  render() {
    return (
      <MainScreen>
        <Header title="Settings" back={false} />
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <View style={styles.container}>
          {/* <Tabs
            tabsData={this._getTabData()}
            tabContainerStyle={styles.tabContainer}
            tabLabelStyle={styles.tabLabelStyle}
            tabLabelSelectedStyle={styles.tabSelectedLabel}
            bottomLineStyle={styles.bottomLineStyle}
            onTabChanged={this._onTabChanged}
          /> */}
          <ScrollView>
            {/* {this._renderAccount()} */}
            {this._renderHelp()}
            {this._renderAbout()}
            {this._renderSignOut()}
          </ScrollView>
        </View>
      </MainScreen>
    );
  }
}
