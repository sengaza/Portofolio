import React from 'react';
import { View, Text, StatusBar, ScrollView, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './FamilyEdit.styles';
import I18n from '../../i18n';
import PrimaryButton from '../../components/elements/PrimaryButton';
import MainScreen from '../../components/layouts/MainScreen';
import HeaderDetail from '../../components/elements/HeaderDetail';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import maritalOptions from '../../fixtures/maritalStatus.json';
import Picker from '../../components/elements/Picker';
import { noop } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import BasicTitle from '../../components/elements/BasicTitle';
import AddRemove from '../../components/elements/AddRemove';

export default class FamilyEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0,
      loading: false,
      farmerMaritalStatus: -1,
      farmerDependentChild: '',
      farmerMotherName: '',
      isSuccessModalOpen: false,
      snackBar: false,
      message: '',
      isVisibleEdit: false,
      isChanged: false,
      data: {},
      disableRemove: false
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

  _checkDisableRemove = () => {
    const { farmerDependentChild } = this.state;
    if (farmerDependentChild === 0) {
      this.setState({ disableRemove: true });
    } else {
      this.setState({ disableRemove: false });
    }
  };

  _getParams = async () => {
    const farmerId = _.get(this.props.navigation.state, 'params.farmerId', '');
    const data = _.get(this.props.navigation.state, 'params.data', '');
    let { farmerDependentChild } = data;
    if (farmerDependentChild === '') {
      farmerDependentChild = 0;
    }
    await this.setState({
      data,
      farmerId,
      farmerMaritalStatus: data.farmerMaritalStatus,
      farmerDependentChild,
      farmerMotherName: data.farmerMotherName
    });
    await this._checkDisableRemove();
  };

  _handleName = async text => {
    await this.setState({ farmerMotherName: text });
    await this._checkEligibility();
  };

  _renderMotherName = () => {
    const { farmerMotherName } = this.state;
    return (
      <View style={styles.formMotherNameContainer}>
        <BasicTitle
          label={I18n.t('motherName')}
          maxLength={30}
          onChangeText={this._handleName}
          placeholder={I18n.t('placeholders.editMotherName')}
          value={farmerMotherName}
        />
      </View>
    );
  };

  _checkEligibility = () => {
    const { farmerMaritalStatus, farmerDependentChild, farmerMotherName, data } = this.state;
    if (
      farmerMaritalStatus === data.farmerMaritalStatus &&
      farmerDependentChild === data.farmerDependentChild &&
      farmerMotherName === data.farmerMotherName
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };

  _addDependent = async () => {
    const { farmerDependentChild } = this.state;
    await this.setState({ farmerDependentChild: farmerDependentChild + 1 });
    await this._checkDisableRemove();
    await this._checkEligibility();
  };

  _removeDependent = async () => {
    const { farmerDependentChild } = this.state;
    if (farmerDependentChild > 0) {
      await this.setState({ farmerDependentChild: farmerDependentChild - 1 });
    }
    await this._checkDisableRemove();
    await this._checkEligibility();
  };

  _renderAddRemove = () => {
    const { farmerDependentChild, disableRemove } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <AddRemove
          label={I18n.t('dependents')}
          onAdd={this._addDependent}
          onRemove={this._removeDependent}
          removeDisabled={disableRemove}
          value={farmerDependentChild}
        />
      </View>
    );
  };

  _onSelectMaritalStatus = async index => {
    await this.setState({
      farmerMaritalStatus: index
    });
    await this._checkEligibility();
  };

  _renderPicker = () => {
    const { farmerMaritalStatus } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <Text style={styles.labelStyle}>{I18n.t('marriageStatus')}</Text>
        <Picker
          onSelect={this._onSelectMaritalStatus}
          options={maritalOptions}
          selected={farmerMaritalStatus}
          placeholder={I18n.t('placeholders.editMaritalStatus')}
        />
      </View>
    );
  };

  _onPressSave = async () => {
    const { farmerMaritalStatus, farmerDependentChild, farmerMotherName, farmerId } = this.state;
    const params = {
      farmerFamilyDetail: {
        farmerMaritalStatus,
        farmerDependentChild,
        farmerMotherName
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
        <HeaderDetail close title={I18n.t('familyDetail')} onPressClose={() => this._onPressClose()} />
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
          {this._renderMotherName()}
          {this._renderAddRemove()}
          {this._renderPicker()}
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

FamilyEdit.propTypes = {
  navigation: PropTypes.object
};

FamilyEdit.defaultProps = {
  navigation: noop
};
