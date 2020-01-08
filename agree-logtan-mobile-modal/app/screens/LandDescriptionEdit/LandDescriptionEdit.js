import React from 'react';
import { View, StatusBar, ScrollView, Text, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './LandDescriptionEdit.styles';
import BasicTitle from '../../components/elements/BasicTitle';
import HeaderDetail from '../../components/elements/HeaderDetail';
import Picker from '../../components/elements/Picker';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import PrimaryButton from '../../components/elements/PrimaryButton';
import SnackBar from '../../components/elements/SnackBar';
import MainScreen from '../../components/layouts/MainScreen';
import { ENDPOINT } from '../../configs';
import irrigationOptions from '../../fixtures/irrigation.json';
import unitOptions from '../../fixtures/unit.json';
import I18n from '../../i18n';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { noop, roundNum } from '../../utils';
import errors from '../../utils/errors';

export default class LandDescriptionEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      isChanged: false,
      isEditModalOpen: false,
      isVisibleEdit: false,
      loading: false,
      landSize: null,
      plantingSeasonIrrigation: -1,
      plantingSeasonName: '',
      snackBar: false,
      unitSelected: 0
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
      plantingSeasonName: data.plantingSeasonName,
      landSize: roundNum(data.plantingSeasonSize * 10000).toString(),
      plantingSeasonIrrigation: data.plantingSeasonIrrigation ? data.plantingSeasonIrrigation : -1
    });
  };

  _handleName = async text => {
    await this.setState({ plantingSeasonName: text });
    await this._checkEligibility();
  };

  _handleSize = async text => {
    await this.setState({ landSize: text });
    await this._checkEligibility();
  };

  _onCloseSnackBar = () => {
    this.setState({ snackBar: false });
  };

  _onPressSave = async () => {
    const { landId, landSize, plantingSeasonIrrigation, plantingSeasonName, unitSelected } = this.state;
    let plantingSeasonSize = landSize / 10000;

    if (unitSelected === '1') plantingSeasonSize = landSize;
    else if (unitSelected === '2') plantingSeasonSize = landSize * 0.0014;
    else if (unitSelected === '3') plantingSeasonSize = landSize * 0.714;

    const params = {
      plantingSeasonName,
      plantingSeasonSize,
      plantingSeasonIrrigation
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

  _onSelectIrrigation = async index => {
    await this.setState({
      plantingSeasonIrrigation: index
    });
    await this._checkEligibility();
  };

  _onSelectUnit = async index => {
    await this.setState({
      unitSelected: index
    });
    await this._checkEligibility();
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
    const { plantingSeasonIrrigation, plantingSeasonName, landSize, unitSelected, data } = this.state;
    if (
      plantingSeasonName === data.plantingSeasonName &&
      plantingSeasonIrrigation === data.plantingSeasonIrrigation &&
      landSize === data.plantingSeasonSize * 10000 &&
      unitSelected === 0
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };

  _renderIrrigation() {
    const { plantingSeasonIrrigation } = this.state;
    const pickerStyles =
      plantingSeasonIrrigation < 0 ? styles.irrigationTextStyleEmpty : styles.irrigationTextStyle;

    return (
      <View style={styles.inputBox}>
        <Text style={styles.labelStyle}>{I18n.t('irrigation')}</Text>
        <Picker
          customDropdownStyle={styles.irrigationContainer}
          customTextStyle={pickerStyles}
          onSelect={this._onSelectIrrigation}
          options={irrigationOptions}
          selected={plantingSeasonIrrigation}
          placeholder={I18n.t('placeholders.editIrrigation')}
        />
      </View>
    );
  }

  _renderForm = () => {
    const { landSize, plantingSeasonName, unitSelected } = this.state;

    return (
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <BasicTitle
          customContainer={styles.inputBox}
          label={I18n.t('landNameOrDesc')}
          maxLength={30}
          onChangeText={this._handleName}
          placeholder={I18n.t('placeholders.addLandName')}
          value={plantingSeasonName}
        />
        <View style={styles.inputBoxSize}>
          <BasicTitle
            customContainer={styles.inputSize}
            label={I18n.t('activeLandSize')}
            keyboardType="numeric"
            onChangeText={this._handleSize}
            placeholder="0"
            value={landSize}
          />
          <Picker
            customContainer={styles.inputUnit}
            customDropdownStyle={styles.dropdownContainer}
            customPickerStyle={styles.inputUnitPicker}
            onSelect={this._onSelectUnit}
            options={unitOptions}
            selected={unitSelected}
          />
        </View>
        {this._renderIrrigation()}
      </ScrollView>
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
    const { isEditModalOpen, isVisibleEdit, loading, message, snackBar } = this.state;

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
        <HeaderDetail close onPressClose={this._onPressClose} title={I18n.t('landDescription')} />
        {this._renderForm()}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            customContainer={styles.button}
            onPress={this._onPressSave}
            size="medium"
            title={I18n.t('save')}
          />
        </View>
        {isEditModalOpen && this._renderModalSuccess()}
        {isVisibleEdit && this._renderModalEdit()}
      </MainScreen>
    );
  }
}

LandDescriptionEdit.propTypes = {
  navigation: PropTypes.object
};

LandDescriptionEdit.defaultProps = {
  navigation: noop
};
