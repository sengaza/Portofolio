import React from 'react';
import { View, Text, RefreshControl, StatusBar, Image, AsyncStorage, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import MainScreen from '../../components/layouts/MainScreen';
import styles from './styles';
import errors from '../../utils/errors';
import I18n from '../../i18n';
import images from '../../configs/images';
import DashboardWidget from '../../components/elements/DashboardWidget/DashboardWidget';
import { getFirstName, toTitleCase, noop } from '../../utils';
import { ENDPOINT } from '../../configs';
import { STORAGE_KEY } from '../../constants';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      loading: false,
      gradient: {
        start: { x: 0.5, y: 0 },
        end: { x: 0.5, y: 0.7 },
        location: [0, 1],
        colors: ['rgba(255,255,255, 1)', 'rgba(255,255,255, 1)']
      }
    };
  }

  async componentDidMount() {
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
    });
    await this._getData();
  }

  _getData = async () => {
    this.setState({ loading: true });
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getHome();
      const fullName = await AsyncStorage.getItem(STORAGE_KEY.PROFILE);
      this.setState({ farmerData: result.data.dataFarmer, loanData: result.data.dataLoan, fullName });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _renderDashboard = (data, buttonAction) => {
    const { gradient } = this.state;
    const { header = {}, displaying = {} } = data;
    return (
      <DashboardWidget
        cardHeader={header}
        displayingData={displaying}
        gradient={gradient}
        buttonAction={buttonAction}
      />
    );
  };

  _renderFarmerWidget = () => {
    const { farmerData = {} } = this.state;
    const { farmerTotal = 0, farmerPresubmission = 0, farmerSubmission = 0 } = farmerData;

    const header = {
      title: I18n.t('farmerData'),
      value: farmerTotal
    };

    const displaying = {
      farmerTotal,
      farmerPresubmission,
      farmerSubmission
    };
    return this._renderDashboard({ header, displaying }, this._goToFarmerData);
  };

  _renderLoanWidget = () => {
    const { loanData = {} } = this.state;
    const { loanTotal = 0, loanPreSubmission = 0, loanSubmission = 0 } = loanData;

    const header = {
      title: I18n.t('loanData'),
      value: loanTotal
    };

    const displaying = {
      loanTotal,
      loanPreSubmission,
      loanSubmission
    };
    return this._renderDashboard({ header, displaying }, this._gotoLoanData);
  };

  _goToFarmerData = () => {
    this.props.navigation.navigate('FarmerData');
  };

  _gotoLoanData = () => {
    this.props.navigation.navigate('LoanData');
  };

  _renderRefreshControl = () => (
    <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
  );

  _onRefresh = async () => {
    this.setState({ refreshing: true });
    await this._getData();
    this.setState({ refreshing: false });
  };

  _renderNameAndTitle = ({ name }) => {
    const firstName = toTitleCase(getFirstName(name));

    return (
      <View style={styles.nameAndTitleContainer}>
        <View style={styles.userStateWrapper}>
          <Text style={styles.welcome} allowFontScaling>
            {`${I18n.t('welcome')},`}
          </Text>
          <Text style={styles.userName} allowFontScaling>
            {`${firstName}`}
          </Text>
        </View>
      </View>
    );
  };

  _renderViewBody = () => (
    <View>
      <View style={styles.widgetContainer}>
        {this._renderFarmerWidget()}
        {this._renderLoanWidget()}
      </View>
    </View>
  );

  render() {
    const { fullName, loading } = this.state;
    return (
      <MainScreen loading={loading}>
        <LinearGradient colors={['#E4F5FF', '#E4F5FF']}>
          <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
        </LinearGradient>
        <ScrollView style={styles.scrollWrapper} refreshControl={this._renderRefreshControl()}>
          <LinearGradient colors={['#E4F5FF', '#FAFAFA', '#FAFAFA']} style={styles.imageLayout}>
            <Image source={images.background} style={styles.backgroundImage} />
          </LinearGradient>
          {this._renderNameAndTitle({
            name: fullName
          })}
        </ScrollView>

        <View>{this._renderViewBody()}</View>
      </MainScreen>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object
};

Home.defaultProps = {
  navigation: noop
};
