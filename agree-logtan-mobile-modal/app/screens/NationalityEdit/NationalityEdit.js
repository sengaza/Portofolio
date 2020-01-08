import React from 'react';
import { View, Text, StatusBar, ScrollView, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import styles from './NationalityEdit.styles';
import I18n from '../../i18n';
import PrimaryButton from '../../components/elements/PrimaryButton';
import MainScreen from '../../components/layouts/MainScreen';
import HeaderDetail from '../../components/elements/HeaderDetail';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import country from '../../fixtures/country.json';
import nationality from '../../fixtures/nationality.json';
import RadioGroup from '../../components/elements/RadioGroup/RadioGroup';
import { noop } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import PickerPlain from '../../components/elements/PickerPlain';

export default class NationalityEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0,
      loading: false,
      farmerCountryOfResidence: 0,
      farmerNationality: 0,
      isSuccessModalOpen: false,
      snackBar: false,
      message: '',
      isVisibleEdit: false,
      isChanged: false,
      data: {}
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
    // const bankId = _.get(this.props.navigation.state, 'params.bankId', '');
    // const bankName = _.find(bank, { id: bankId }).name;
    const farmerId = _.get(this.props.navigation.state, 'params.farmerId', '');
    const data = _.get(this.props.navigation.state, 'params.data', '');
    this.setState({
      data,
      farmerId,
      farmerCountryOfResidence: data.farmerCountryOfResidence,
      farmerNationality: data.farmerNationality
    });
  };

  _renderCountry = () => {
    const { farmerCountryOfResidence } = this.state;
    // const pickerStyles = educationLevelId < 0 ? styles.educationTextStyleEmpty : styles.educationTextStyle;
    return (
      // <View style={styles.educationContainer}>
      //   <Text style={styles.labelStyle}>{I18n.t('education')}</Text>
      //   <Picker
      //     customTextStyle={pickerStyles}
      //     selected={educationLevelId}
      //     options={educationLevels}
      //     onSelect={this._onSelectVillage}
      //   />
      // </View>

      <View style={styles.formComponentsContainer}>
        <Text style={styles.labelStyle}>{I18n.t('domicileCountry')}</Text>
        <PickerPlain selected={farmerCountryOfResidence} options={country} onSelect={this._onSelectCountry} />
      </View>
    );
  };

  _renderNationality = () => {
    const { farmerNationality } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <Text style={styles.labelStyle}>{I18n.t('nationality')}</Text>
        <RadioGroup
          options={nationality}
          spaceBetween={30}
          selectedIndex={farmerNationality}
          onSelect={this._onSelectNationality}
          disabled
        />
      </View>
    );
  };

  _checkEligibility = () => {
    const { farmerCountryOfResidence, farmerNationality, data } = this.state;
    if (
      farmerCountryOfResidence === data.farmerCountryOfResidence &&
      farmerNationality === data.farmerNationality
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };
  _onSelectCountry = async index => {
    await this.setState({
      farmerCountryOfResidence: index
    });
    await this._checkEligibility();
  };

  _onSelectNationality = async index => {
    await this.setState({
      farmerNationality: index
    });
    await this._checkEligibility();
  };

  _onPressSave = async () => {
    const { farmerNationality, farmerCountryOfResidence, farmerId } = this.state;
    const params = {
      farmerNationalityDetail: {
        farmerCountryOfResidence,
        farmerNationality
      }
    };
    try {
      this.setState({ loading: true, isSuccessModalOpen: false });
      const result = await ENDPOINT.updateFarmerMandiri(farmerId, params);
      if (result.success === true) {
        this.setState({ isSuccessModalOpen: true });
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
    const { farmerId } = this.state;
    this.setState({ isSuccessModalOpen: false });
    const resetAction = NavigationActions.reset({
      index: 3,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'FarmerData' }),
        NavigationActions.navigate({ routeName: 'FarmerProfile', params: { farmerId } }),
        NavigationActions.navigate({ routeName: 'FarmerDetail', params: { farmerId } })
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

  _renderModalSuccess = () => {
    const { isSuccessModalOpen } = this.state;
    return (
      <View>
        <ModalConfirmation
          type
          isVisible={isSuccessModalOpen}
          onPressYes={this._onPressOk}
          rightOption={I18n.t('ok')}
          title={I18n.t('great')}
          description={I18n.t('dataSuccessfullySaved')}
        />
      </View>
    );
  };

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
    const { isSuccessModalOpen, isVisibleEdit, loading, snackBar, message } = this.state;
    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <HeaderDetail close title={I18n.t('nationality')} onPressClose={() => this._onPressClose()} />
        <View style={styles.snackBarContainer}>
          <SnackBar
            position="top"
            visible={snackBar}
            backgroundColor={COLOR_EVENT_ERROR}
            titleMessage={I18n.t('error.editFarmer')}
            textMessage={message}
            onPressClose={noop}
          />
        </View>
        <ScrollView style={styles.scrollContainer}>
          {this._renderCountry()}
          {this._renderNationality()}
          {isVisibleEdit && this._renderModalEdit()}
          {isSuccessModalOpen && this._renderModalSuccess()}
        </ScrollView>
        <View style={styles.buttonArea}>
          <PrimaryButton
            onPress={this._onPressSave}
            customContainer={styles.button}
            size="medium"
            title={I18n.t('save')}
          />
        </View>
      </MainScreen>
    );
  }
}
