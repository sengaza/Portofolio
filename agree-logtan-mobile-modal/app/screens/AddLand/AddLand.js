import React from 'react';
import { StatusBar, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './AddLand.styles';
import Header from '../../components/elements/Header';
import BasicTitle from '../../components/elements/BasicTitle';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import PersistentAddButton from '../../components/elements/PersistentAddButton';
import SnackBar from '../../components/elements/SnackBar';
import MainScreen from '../../components/layouts/MainScreen';
import { ENDPOINT } from '../../configs';
import unitOptions from '../../fixtures/unit.json';
import I18n from '../../i18n';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { isEmpty, noop, formatDate, deviceLanguage } from '../../utils';
import errors from '../../utils/errors';
import PickerPlain from '../../components/elements/PickerPlain';
import SvgCalendar from '../../../assets/svgs/Calendar';
import SvgTick from '../../../assets/svgs/Tick';

export default class AddLand extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      isAddModalOpen: false,
      landSize: null,
      plantingSeasonName: '',
      snackBar: false,
      unitSelected: 0,
      plantingSeasonStartDate: null,
      openDatePicker: false
    };
  }

  async componentWillMount() {
    await this.getParams();
  }

  getParams = () => {
    const { navigation } = this.props;
    const farmerParams = _.get(navigation.state, 'params.farmerId', '');

    this.setState({ plantingSeasonFarmerId: farmerParams });
  };

  _handleName = async text => {
    await this.setState({ plantingSeasonName: text });
  };

  _handleSize = async text => {
    await this.setState({ landSize: text });
  };

  _isInvalidToSubmit = () => {
    const { plantingSeasonName, plantingSeasonStartDate, landSize } = this.state;
    return isEmpty(plantingSeasonName) || isEmpty(landSize) || isEmpty(plantingSeasonStartDate);
  };

  _onAddLand = async () => {
    const {
      landSize,
      plantingSeasonFarmerId,
      plantingSeasonName,
      plantingSeasonStartDate,
      unitSelected
    } = this.state;
    let plantingSeasonSize = landSize / 10000;

    if (unitSelected === '1') plantingSeasonSize = landSize;
    else if (unitSelected === '2') plantingSeasonSize = landSize * 0.0014;
    else if (unitSelected === '3') plantingSeasonSize = landSize * 0.714;

    const params = {
      plantingSeasonFarmerId,
      plantingSeasonName,
      plantingSeasonSize,
      plantingSeasonStartDate
    };

    try {
      this.setState({ loading: true, isAddModalOpen: false });
      const result = await ENDPOINT.createLand(params);
      if (result.success === true) {
        this.setState({ isAddModalOpen: true, landId: result.data.plantingSeasonId });
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

  _onCloseSnackBar = () => {
    this.setState({ snackBar: false });
  };

  _onOpenDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({ openDatePicker: !openDatePicker });
  };

  _onPressLeftButton = () => {
    const { plantingSeasonFarmerId } = this.state;

    this.setState({ isAddModalOpen: false });
    const resetAction = NavigationActions.reset({
      index: 3,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'FarmerData' }),
        NavigationActions.navigate({
          routeName: 'FarmerProfile',
          params: { farmerId: plantingSeasonFarmerId }
        }),
        NavigationActions.navigate({ routeName: 'LandData', params: { farmerId: plantingSeasonFarmerId } })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _onPressRightButton = () => {
    const { plantingSeasonFarmerId, landId } = this.state;

    this.setState({ isAddModalOpen: false });
    const resetAction = NavigationActions.reset({
      index: 4,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'FarmerData' }),
        NavigationActions.navigate({
          routeName: 'FarmerProfile',
          params: { farmerId: plantingSeasonFarmerId }
        }),
        NavigationActions.navigate({ routeName: 'LandData', params: { farmerId: plantingSeasonFarmerId } }),
        NavigationActions.navigate({ routeName: 'LandDetail', params: { landId } })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _onSelectUnit = index => {
    this.setState({
      unitSelected: index
    });
  };

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
          <PickerPlain
            customContainer={styles.inputUnit}
            customDropdownStyle={styles.dropdownContainer}
            customPickerStyle={styles.inputUnitPicker}
            onSelect={this._onSelectUnit}
            options={unitOptions}
            selected={unitSelected}
          />
        </View>
        {this._renderStartPeriod()}
      </ScrollView>
    );
  };

  _renderModalSuccess = () => (
    <View>
      <ModalConfirmation
        isVisible={this.state.isAddModalOpen}
        onPressYes={this._onPressRightButton}
        onPressNo={this._onPressLeftButton}
        leftOption={I18n.t('farmerAddLater')}
        rightOption={I18n.t('farmerAddOk')}
        title={I18n.t('success')}
        description={I18n.t('landAddSuccess')}
      />
    </View>
  );

  _renderStartPeriod = () => {
    const { plantingSeasonStartDate, openDatePicker } = this.state;

    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.labelStyle}>{I18n.t('startPeriod')}</Text>
        <TouchableOpacity style={styles.dateButton} onPress={this._onOpenDatePicker}>
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

  render() {
    const { isAddModalOpen, loading, message, snackBar } = this.state;

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
        <Header title={I18n.t('addActiveLand')} back />
        {this._renderForm()}
        <PersistentAddButton
          customContainer={styles.buttonContainer}
          disabled={this._isInvalidToSubmit()}
          left
          onPress={this._onAddLand}
          title={I18n.t('addActiveLand')}
        />
        {isAddModalOpen && this._renderModalSuccess()}
      </MainScreen>
    );
  }
}

AddLand.propTypes = {
  navigation: PropTypes.object
};

AddLand.defaultProps = {
  navigation: noop
};
