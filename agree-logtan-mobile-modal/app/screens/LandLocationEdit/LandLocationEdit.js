import React from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { API_KEY } from 'react-native-dotenv';
import Geocoder from 'react-native-geocoding';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './LandLocationEdit.styles';
import HeaderDetail from '../../components/elements/HeaderDetail';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import PrimaryButton from '../../components/elements/PrimaryButton';
import SnackBar from '../../components/elements/SnackBar';
import MainScreen from '../../components/layouts/MainScreen';
import { ENDPOINT } from '../../configs';
import I18n from '../../i18n';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { noop } from '../../utils';
import errors from '../../utils/errors';
import SvgMap from '../../../assets/svgs/Map';
import SvgLocation from '../../../assets/svgs/Location';

export default class LandLocationEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      loading: false,
      isLoadingLocation: false,
      isChanged: false,
      isEditModalOpen: false,
      isVisibleEdit: false,
      plantingSeasonAddress: null,
      plantingSeasonLatitude: null,
      plantingSeasonLongtitude: null,
      snackBar: false
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onPressClose);
    this._getParams();
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onPressClose);
  }

  _getParams = () => {
    const { navigation } = this.props;
    const landId = _.get(navigation.state, 'params.landId', '');
    const data = _.get(this.props.navigation.state, 'params.data', '');
    this.setState({
      landId,
      data,
      farmerId: data.plantingSeasonFarmerId,
      plantingSeasonLatitude: data.plantingSeasonLatitude,
      plantingSeasonLongtitude: data.plantingSeasonLongtitude,
      plantingSeasonAddress: data.plantingSeasonAddress
    });
  };

  _getGeocoder = async (lat, long) => {
    try {
      this.setState({ isLoadingLocation: true });
      const location = await Geocoder.from(lat, long);
      await this.setState({ plantingSeasonAddress: location.results[0].formatted_address });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ isLoadingLocation: false });
    }
  };

  _onCloseSnackBar = () => {
    this.setState({ snackBar: false });
  };

  _onSetLocation = async () => {
    await Geocoder.init(API_KEY);
    // eslint-disable-next-line no-undef
    await navigator.geolocation.getCurrentPosition(
      async position => {
        await this.setState({
          plantingSeasonLatitude: position.coords.latitude,
          plantingSeasonLongtitude: position.coords.longitude,
          message: null
        });
        await this._getGeocoder(position.coords.latitude, position.coords.longitude);
        await this._checkEligibility();
      },
      error => this.setState({ snackBar: true, message: error.message }),
      { enableHighAccuracy: false, timeOut: 6000 }
    );
  };

  _onPressSave = async () => {
    const { landId, plantingSeasonLatitude, plantingSeasonLongtitude, plantingSeasonAddress } = this.state;
    const params = {
      plantingSeasonAddress,
      plantingSeasonLatitude: plantingSeasonLatitude.toString(),
      plantingSeasonLongtitude: plantingSeasonLongtitude.toString()
    };

    try {
      this.setState({ loading: true, isEditModalOpen: false });
      const result = await ENDPOINT.updateLandMandiri(landId, params);
      if (result.success === true) {
        this.setState({ isEditModalOpen: true });
      }
      if (result.success === false) {
        this.setState({ snackBar: true, message: result.message });
        setTimeout(() => {
          this.setState({ snackBar: false });
        }, 3000);
      }
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _onPressOk = () => {
    const { farmerId, landId } = this.state;

    this.setState({ isEditModalOpen: false });
    const resetAction = NavigationActions.reset({
      index: 4,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'FarmerData' }),
        NavigationActions.navigate({
          routeName: 'FarmerProfile',
          params: { farmerId }
        }),
        NavigationActions.navigate({ routeName: 'LandData', params: { farmerId } }),
        NavigationActions.navigate({ routeName: 'LandDetail', params: { landId } })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _onPressClose = async () => {
    const { isChanged } = this.state;
    if (isChanged) {
      await this.setState({ isVisibleEdit: true });
    } else await this._goBack();
    return true;
  };

  _goBack = () => this.props.navigation.goBack();

  _closeModalEdit = () => this.setState({ isVisibleEdit: false });

  _checkEligibility = () => {
    const { plantingSeasonLatitude, plantingSeasonLongtitude, plantingSeasonAddress, data } = this.state;
    if (
      plantingSeasonAddress === data.plantingSeasonAddress &&
      plantingSeasonLatitude === data.plantingSeasonLatitude &&
      plantingSeasonLongtitude === data.plantingSeasonLongtitude
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };

  _renderTextField = (label, value, placeholder, isMap) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.labelStyle}>{I18n.t(label)}</Text>
      <TouchableOpacity style={styles.fieldButton} onPress={this._onSetLocation}>
        {value ? (
          <Text style={styles.fieldText}>{value}</Text>
        ) : (
          <Text style={styles.fieldTextEmpty}>{I18n.t(`placeholders.${placeholder}`)}</Text>
        )}
        {isMap && <SvgMap />}
      </TouchableOpacity>
    </View>
  );

  _renderForm = () => {
    const { plantingSeasonLatitude, plantingSeasonLongtitude, plantingSeasonAddress } = this.state;
    const coordinates =
      (plantingSeasonLatitude || plantingSeasonLongtitude) &&
      `${plantingSeasonLongtitude}, ${plantingSeasonLatitude}`;

    return (
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        {this._renderTextField('coordinate', coordinates, 'editCoordinates', true)}
        {this._renderTextField('landAddress', plantingSeasonAddress, 'editAddress')}
      </ScrollView>
    );
  };

  _renderLoadingLocation = () => (
    <View style={styles.loadingContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.loaddingComponent}>
        <SvgLocation />
        <Text style={styles.loadingText}>{I18n.t('scanLocation')}</Text>
      </View>
    </View>
  );

  _renderContent = () => {
    const { isLoadingLocation } = this.state;

    if (isLoadingLocation) return this._renderLoadingLocation();
    return (
      <>
        {this._renderForm()}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            customContainer={styles.button}
            onPress={this._onPressSave}
            size="medium"
            title={I18n.t('save')}
          />
        </View>
      </>
    );
  };

  _renderModalSuccess = () => (
    <View>
      <ModalConfirmation
        type
        isVisible={this.state.isEditModalOpen}
        onPressYes={this._onPressOk}
        rightOption={I18n.t('ok')}
        title={I18n.t('great')}
        description={I18n.t('dataSuccessfullySaved')}
      />
    </View>
  );

  _renderModalEdit() {
    return (
      <View>
        <ModalConfirmation
          isVisible={this.state.isVisibleEdit}
          onPressYes={this._goBack}
          onPressNo={this._closeModalEdit}
          rightOption={I18n.t('ok')}
          leftOption={I18n.t('no')}
          title={I18n.t('confirmation')}
          description={I18n.t('confirmationData')}
        />
      </View>
    );
  }

  render() {
    const { loading, isEditModalOpen, isVisibleEdit, snackBar, message } = this.state;

    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <View style={styles.snackBarContainer}>
          <SnackBar
            position="top"
            visible={snackBar}
            backgroundColor={COLOR_EVENT_ERROR}
            titleMessage={I18n.t('error.addLand')}
            textMessage={message}
            onPressClose={this._onCloseSnackBar}
          />
        </View>
        <HeaderDetail close onPressClose={this._onPressClose} title={I18n.t('landLocation')} />
        {this._renderContent()}
        {isEditModalOpen && this._renderModalSuccess()}
        {isVisibleEdit && this._renderModalEdit()}
      </MainScreen>
    );
  }
}

LandLocationEdit.propTypes = {
  navigation: PropTypes.object
};

LandLocationEdit.defaultProps = {
  navigation: noop
};
