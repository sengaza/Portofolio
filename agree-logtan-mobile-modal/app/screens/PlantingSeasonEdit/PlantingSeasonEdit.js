import React from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './PlantingSeasonEdit.styles';
import BasicTitle from '../../components/elements/BasicTitle';
import HeaderDetail from '../../components/elements/HeaderDetail';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import Picker from '../../components/elements/Picker';
import PrimaryButton from '../../components/elements/PrimaryButton';
import SnackBar from '../../components/elements/SnackBar';
import MainScreen from '../../components/layouts/MainScreen';
import { ENDPOINT } from '../../configs';
import weightUnitOptions from '../../fixtures/weightUnit.json';
import I18n from '../../i18n';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { noop, formatDate, deviceLanguage } from '../../utils';
import errors from '../../utils/errors';
import SvgCalendar from '../../../assets/svgs/Calendar';
import SvgTick from '../../../assets/svgs/Tick';

export default class PlantingSeasonEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {},
      loading: false,
      commodities: [],
      commoditySelectedIdx: -1,
      isChanged: false,
      isEditModalOpen: false,
      isVisibleEdit: false,
      plantingSeasonStartDate: null,
      estimatedHarvest: '',
      snackBar: false,
      unitSelected: 0,
      varieties: [],
      varietySelectedIdx: -1,
      openDatePicker: false,
      farmerLoanStatus: ''
    };
  }

  async componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onPressClose);
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
    await this._getCommodities();
    await this._getVarieties();
    await this._getParams();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onPressClose);
  }

  _getParams = () => {
    const { navigation } = this.props;
    const { commodities, varieties } = this.state;
    const landId = _.get(navigation.state, 'params.landId', '');
    const data = _.get(navigation.state, 'params.data', '');
    const farmerLoanStatus = _.get(navigation.state, 'params.farmerLoanStatus', '');
    this.setState({
      landId,
      data,
      farmerLoanStatus,
      farmerId: data.plantingSeasonFarmerId,
      plantingSeasonStartDate: data.plantingSeasonStartDate === '' ? null : data.plantingSeasonStartDate,
      estimatedHarvest: data.plantingSeasonEstimatedHarvest.toString(),
      commoditySelectedIdx: commodities.findIndex(e => e.commodityId === data.plantingSeasonCommodityId),
      varietySelectedIdx: varieties.findIndex(e => e.varietyId === data.plantingSeasonVarietyId)
    });
  };

  _getCommodities = async () => {
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getCommodity();
      await this.setState({ commodities: [result.data[result.data.length - 1]] });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _getVarieties = async () => {
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getVariety();
      await this.setState({ varieties: result.data });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _handleEstimatedHarvest = async text => {
    await this.setState({ estimatedHarvest: text });
    await this._checkEligibility();
  };

  _onCloseSnackBar = () => {
    this.setState({ snackBar: false });
  };

  _onOpenDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({ openDatePicker: !openDatePicker });
  };

  _onSelectUnit = async index => {
    await this.setState({ unitSelected: index });
    await this._checkEligibility();
  };

  _onSelectCommodity = async index => {
    await this.setState({ commoditySelectedIdx: index });
    await this._checkEligibility();
  };

  _onSelectVariety = async index => {
    await this.setState({ varietySelectedIdx: index });
    await this._checkEligibility();
  };

  _onPressSave = async () => {
    const {
      landId,
      plantingSeasonStartDate,
      commoditySelectedIdx,
      commodities,
      varietySelectedIdx,
      varieties,
      estimatedHarvest,
      unitSelected
    } = this.state;
    const selectedCommodity = commoditySelectedIdx >= 0 ? commodities[commoditySelectedIdx].commodityId : '';
    const selectedVariety = varietySelectedIdx >= 0 ? varieties[varietySelectedIdx].varietyId : '';
    let plantingSeasonEstimatedHarvest = estimatedHarvest;

    if (unitSelected === '1') plantingSeasonEstimatedHarvest = estimatedHarvest * 1000;

    const params = {
      plantingSeasonStartDate,
      plantingSeasonEstimatedHarvest,
      plantingSeasonCommodityId: selectedCommodity,
      plantingSeasonVarietyId: selectedVariety
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
    const { farmerId, farmerLoanStatus, landId } = this.state;

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
        NavigationActions.navigate({ routeName: 'LandData', params: { farmerId, farmerLoanStatus } }),
        NavigationActions.navigate({ routeName: 'LandDetail', params: { landId, farmerLoanStatus } })
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
    const {
      plantingSeasonStartDate,
      commoditySelectedIdx,
      varietySelectedIdx,
      unitSelected,
      estimatedHarvest,
      data,
      commodities,
      varieties
    } = this.state;
    if (
      plantingSeasonStartDate === data.plantingSeasonStartDate &&
      commoditySelectedIdx === commodities.findIndex(e => e.commodityId === data.plantingSeasonCommodityId) &&
      varietySelectedIdx === varieties.findIndex(e => e.varietyId === data.plantingSeasonVarietyId) &&
      estimatedHarvest === data.plantingSeasonEstimatedHarvest.toString() &&
      unitSelected === 0
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };

  _renderCommodity() {
    const { commodities, commoditySelectedIdx } = this.state;
    const newCommodities = commodities.map(e => ({
      id: e.commodityId,
      name: e.commodityName.toLowerCase().replace(' ', '')
    }));
    const pickerStyles = commoditySelectedIdx < 0 ? styles.pickerTextStyleEmpty : styles.pickerTextStyle;

    return (
      <View style={styles.inputBoxPicker}>
        <Text style={styles.labelStyle}>{I18n.t('commodity')}</Text>
        <Picker
          customDropdownStyle={styles.pickerContainer}
          customTextStyle={pickerStyles}
          onSelect={this._onSelectCommodity}
          options={newCommodities}
          placeholder={I18n.t('placeholders.editCommodity')}
          selected={commoditySelectedIdx}
        />
      </View>
    );
  }

  _renderStartPeriod = () => {
    const { plantingSeasonStartDate, openDatePicker, farmerLoanStatus } = this.state;

    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.labelStyle}>{I18n.t('startPeriod')}</Text>
        <TouchableOpacity
          disabled={farmerLoanStatus !== ''}
          style={styles.dateButton}
          onPress={this._onOpenDatePicker}
        >
          {plantingSeasonStartDate ? (
            <Text style={styles.dateText}>{formatDate(plantingSeasonStartDate, 'DD/MM/YYYY')}</Text>
          ) : (
            <Text style={styles.dateTextEmpty}>DD/MM/YY</Text>
          )}
          {openDatePicker ? <SvgTick main /> : <SvgCalendar />}
        </TouchableOpacity>
        {openDatePicker && (
          <Animatable.View animation="fadeIn">
            <DatePicker
              locale={deviceLanguage}
              mode="date"
              date={plantingSeasonStartDate ? new Date(plantingSeasonStartDate) : new Date()}
              onDateChange={date => this.setState({ plantingSeasonStartDate: date })}
            />
          </Animatable.View>
        )}
      </View>
    );
  };

  _renderVariety() {
    const { varieties, varietySelectedIdx } = this.state;
    const newVarieties = varieties.map(e => ({
      id: e.varietyId,
      name: e.varietyName.toLowerCase()
    }));
    const pickerStyles = varietySelectedIdx < 0 ? styles.pickerTextStyleEmpty : styles.pickerTextStyle;

    return (
      <View style={styles.inputBoxPicker}>
        <Text style={styles.labelStyle}>{I18n.t('variety')}</Text>
        <Picker
          customDropdownStyle={styles.pickerContainer}
          customTextStyle={pickerStyles}
          onSelect={this._onSelectVariety}
          options={newVarieties}
          placeholder={I18n.t('placeholders.editVariety')}
          selected={varietySelectedIdx}
        />
      </View>
    );
  }

  _renderHarvest() {
    const { unitSelected, estimatedHarvest } = this.state;

    return (
      <View style={styles.inputBoxSize}>
        <BasicTitle
          customContainer={styles.inputSize}
          label={I18n.t('estimatedHarvest')}
          keyboardType="numeric"
          onChangeText={this._handleEstimatedHarvest}
          placeholder="0"
          value={estimatedHarvest}
        />
        <Picker
          customContainer={styles.inputUnit}
          customDropdownStyle={styles.dropdownContainer}
          customPickerStyle={styles.inputUnitPicker}
          onSelect={this._onSelectUnit}
          options={weightUnitOptions}
          selected={unitSelected}
        />
      </View>
    );
  }

  _renderForm = () => (
    <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
      {this._renderStartPeriod()}
      {this._renderCommodity()}
      {this._renderVariety()}
      {this._renderHarvest()}
    </ScrollView>
  );

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
    const { loading, isEditModalOpen, isVisibleEdit, message, snackBar } = this.state;

    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <View style={styles.snackBarContainer}>
          <SnackBar
            position="top"
            visible={snackBar}
            backgroundColor={COLOR_EVENT_ERROR}
            titleMessage={I18n.t('error.editPlantingSeason')}
            textMessage={message}
            onPressClose={this._onCloseSnackBar}
          />
        </View>
        <HeaderDetail close onPressClose={this._onPressClose} title={I18n.t('plantingSeasonPeriod')} />
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

PlantingSeasonEdit.propTypes = {
  navigation: PropTypes.object
};

PlantingSeasonEdit.defaultProps = {
  navigation: noop
};
