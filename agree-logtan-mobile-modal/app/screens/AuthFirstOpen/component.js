import React from 'react';
// import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import MainScreen from '../../components/layouts/MainScreen';
import I18n from '../../i18n';
import styles from './styles';
// import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import { noop } from '../../utils';
import { ENDPOINT } from '../../configs';
// import { STORAGE_KEY } from '../../constants';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    this._bootstrapAsync();
  }

  async _bootstrapAsync() {
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getHome();
      if (result.success === true) {
        this._navigateToHome();
      } else {
        this.setState({ loading: false });
        this._navigateToLogin();
      }
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
      this._navigateToLogin();
    } finally {
      this.setState({ loading: false });
    }
  }

  _navigateToHome = () => {
    this.props.navigation.navigate('Home');
  };

  _navigateToLogin = () => {
    this.props.navigation.navigate('OnBoarding');
  };

  render() {
    const { loading } = this.state;
    return <MainScreen style={styles.container} loading={loading} />;
  }
}

Component.propTypes = {
  navigation: PropTypes.object
};

Component.defaultProps = {
  navigation: noop
};
