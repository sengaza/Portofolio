import React from 'react';
import { View, StatusBar, ScrollView, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import styles from './EmergencyContactEdit.styles';
import I18n from '../../i18n';
import PrimaryButton from '../../components/elements/PrimaryButton';
import MainScreen from '../../components/layouts/MainScreen';
import HeaderDetail from '../../components/elements/HeaderDetail';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { noop } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import BasicTitle from '../../components/elements/BasicTitle';

export default class FamilyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0,
      loading: false,
      isSuccessModalOpen: false,
      snackBar: false,
      message: '',
      emergencyName: '',
      emergencyRelationship: '',
      emergencyContactNumber: '',
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
    const farmerId = _.get(this.props.navigation.state, 'params.farmerId', '');
    const data = _.get(this.props.navigation.state, 'params.data', '');
    this.setState({
      data,
      farmerId,
      emergencyName: data.emergencyName,
      emergencyRelationship: data.emergencyRelationship,
      emergencyContactNumber: data.emergencyContactNumber
    });
  };

  _handleContactName = async text => {
    await this.setState({ emergencyName: text });
    await this._checkEligibility();
  };

  _handleRelationship = async text => {
    await this.setState({ emergencyRelationship: text });
    await this._checkEligibility();
  };

  _handleEmergencyContact = async text => {
    await this.setState({ emergencyContactNumber: text });
    await this._checkEligibility();
  };

  _renderContactName = () => {
    const { emergencyName = '' } = this.state;
    return (
      <View style={styles.formContainer}>
        <BasicTitle
          label={I18n.t('contactablePerson')}
          // maxLength={30}
          onChangeText={this._handleContactName}
          placeholder={I18n.t('placeholders.editEmergencyNameContact')}
          value={emergencyName}
        />
      </View>
    );
  };

  _renderRelationship = () => {
    const { emergencyRelationship = '' } = this.state;
    return (
      <View style={styles.formContainer}>
        <BasicTitle
          label={I18n.t('relationship')}
          // maxLength={30}
          onChangeText={this._handleRelationship}
          placeholder={I18n.t('placeholders.editRelationship')}
          value={emergencyRelationship}
        />
      </View>
    );
  };

  _renderEmergencyContact = () => {
    const { emergencyContactNumber = '' } = this.state;
    return (
      <View style={styles.formContainer}>
        <BasicTitle
          label={I18n.t('emergencyContactNo')}
          // maxLength={30}
          keyboardType="numeric"
          onChangeText={this._handleEmergencyContact}
          placeholder={I18n.t('placeholders.editEmergencyContact')}
          value={emergencyContactNumber}
        />
      </View>
    );
  };

  _checkEligibility = () => {
    const { emergencyName, emergencyRelationship, emergencyContactNumber, data } = this.state;
    if (
      emergencyName === data.emergencyName &&
      emergencyRelationship === data.emergencyRelationship &&
      emergencyContactNumber === data.emergencyContactNumber
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
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

  _onPressSave = async () => {
    const { emergencyName, emergencyRelationship, emergencyContactNumber, farmerId } = this.state;
    const params = {
      farmerEmergencyContact: {
        emergencyName,
        emergencyRelationship,
        emergencyContactNumber
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
        <HeaderDetail close title={I18n.t('emergencyContact')} onPressClose={() => this._onPressClose()} />
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
          {this._renderContactName()}
          {this._renderRelationship()}
          {this._renderEmergencyContact()}
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
