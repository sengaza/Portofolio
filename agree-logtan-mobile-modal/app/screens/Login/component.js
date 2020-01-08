import React from 'react';
// import { Image, Text, CheckBox, AsyncStorage, View, StatusBar } from 'react-native';
import { Image, Text, View, StatusBar, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import MainScreen from '../../components/layouts/MainScreen';
import SnackBar from '../../components/elements/SnackBar';
import styles from './styles';
import images from '../../configs/images';
import I18n from '../../i18n';
import BasicTitle from '../../components/elements/BasicTitle';
import PrimaryButton from '../../components/elements/PrimaryButton';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import { COLOR_EVENT_ERROR, COLOR_WHITE } from '../../styles';
import { STORAGE_KEY } from '../../constants';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      showPass: true,
      username: '',
      password: '',
      disableButton: true,
      error: false,
      snackBar: false,
      loading: false,
      message: ''
    };
  }

  _handleLogin = async () => {
    const { username, password } = this.state;
    const passwordEncrypt = await CryptoJS.AES.encrypt(password, 'bumn2018').toString();
    const params = {
      username,
      password: passwordEncrypt,
      gate: 'app-modal'
    };
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.login(params);
      if (result.code === 403 || result.code === 400) {
        this.setState({ snackBar: true, message: result.message });
        setTimeout(() => {
          this.setState({ snackBar: false });
        }, 3000);
      } else {
        // await AsyncStorage.setItem(STORAGE_KEY.FIELD_ASSISTANT_ID, result.data.fieldAssistantId);
        await AsyncStorage.setItem(STORAGE_KEY.PROFILE, result.data.fullName);
        await AsyncStorage.setItem(STORAGE_KEY.TOKEN, result.data.accessToken);
        this.setState({ loading: false });
        this.props.navigation.navigate('Home');
      }
      // this.props.navigation.navigate('Home');
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _handleCheckbox = () => {
    this.setState({ checked: !this.state.checked });
  };

  _handleShowPass = () => {
    this.setState({ showPass: !this.state.showPass });
  };

  _handleUsername = async text => {
    await this.setState({ username: text });
    this.checkField();
  };

  _handlePassword = async text => {
    await this.setState({ password: text });
    this.checkField();
  };

  _handleSnackBar = () => {
    this.setState({ snackBar: false });
  };

  checkField() {
    const { username, password } = this.state;
    if (username === '' || password === '') {
      this.setState({ disableButton: true });
    } else {
      this.setState({ disableButton: false });
    }
  }

  render() {
    const { error, loading, showPass, snackBar, disableButton, message = '' } = this.state;
    const image = showPass ? images.eye : images.eyeClosed;
    return (
      <MainScreen style={styles.container} loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} />
        <SnackBar
          position="top"
          visible={snackBar}
          backgroundColor={COLOR_EVENT_ERROR}
          titleMessage={I18n.t('error.loginTitle')}
          textMessage={message}
          onPressClose={this._handleSnackBar}
        />
        <View style={styles.containerLogin}>
          {/* <View style={styles.topContainer}> */}
          <Image source={images.logo} style={styles.logo} resizeMode="contain" />
          {/* </View> */}

          {/* <View style={styles.midContainer}> */}
          <BasicTitle
            customContainer={styles.inputBoxName}
            customTextInput={styles.inputName}
            label={I18n.t('username')}
            onChangeText={this._handleUsername}
            errorMessage={error ? '' : null}
          />
          <BasicTitle
            customContainer={styles.inputBoxPass}
            customTextInput={styles.inputPass}
            label={I18n.t('password')}
            password
            secureTextEntry={showPass}
            image={image}
            onPressShowPass={this._handleShowPass}
            onPressHiddenPass={this._handleShowPass}
            onChangeText={this._handlePassword}
            errorMessage={error ? '' : null}
          />
          <View style={styles.bottomContainer}>
            {error && <Text style={styles.textError}>{I18n.t('error.login')}</Text>}
            <PrimaryButton
              onPress={this._handleLogin}
              customContainer={styles.button}
              title={I18n.t('login')}
              disabled={disableButton}
            />
            <Text style={styles.forgotPassword}>{I18n.t('forgotPassword')}</Text>
          </View>
        </View>
      </MainScreen>
    );
  }
}

Component.propTypes = {
  navigation: PropTypes.object
};
Component.defaultProps = {
  navigation: null
};
