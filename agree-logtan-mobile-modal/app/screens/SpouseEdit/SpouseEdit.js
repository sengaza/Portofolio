import React from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import DatePicker from 'react-native-date-picker';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import styles from './SpouseEdit.styles';
import I18n from '../../i18n';
import PrimaryButton from '../../components/elements/PrimaryButton';
import MainScreen from '../../components/layouts/MainScreen';
import HeaderDetail from '../../components/elements/HeaderDetail';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { noop, formatDate, deviceLanguage } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import BasicTitle from '../../components/elements/BasicTitle';
import SvgCalendar from '../../../assets/svgs/Calendar';
import Picker from '../../components/elements/Picker';
import work from '../../fixtures/work.json';
import SvgTick from '../../../assets/svgs/Tick';

export default class SpouseEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0,
      loading: false,
      isSuccessModalOpen: false,
      spouseProfession: -1,
      snackBar: false,
      message: '',
      spouseNik: 0,
      spouseIncome: 0,
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
      spouseName: data.spouseName,
      spouseNik: data.spouseNik,
      spouseProfession: data.spouseProfession,
      spouseIncome: data.spouseIncome.toString(),
      spouseDateOfBirth: data.spouseDateOfBirth === '' ? null : data.spouseDateOfBirth,
      spousePlaceOfBirth: data.spousePlaceOfBirth
    });
  };

  _renderSpouseName = () => {
    const { spouseName } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <BasicTitle
          label={I18n.t('spouseName')}
          maxLength={30}
          onChangeText={this._handleSpouseName}
          placeholder={I18n.t('placeholders.editSpouseName')}
          value={spouseName}
        />
      </View>
    );
  };

  _checkEligibility = () => {
    const {
      spouseName,
      spouseProfession,
      spouseNik,
      spousePlaceOfBirth,
      spouseDateOfBirth,
      spouseIncome,
      data
    } = this.state;
    if (
      spouseName === data.spouseName &&
      spouseProfession === data.spouseProfession &&
      spouseNik === data.spouseNik &&
      spousePlaceOfBirth === data.spousePlaceOfBirth &&
      spouseDateOfBirth === data.spouseDateOfBirth &&
      spouseIncome === data.spouseIncome
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };

  _handleSpouseName = async text => {
    await this.setState({ spouseName: text });
    await this._checkEligibility();
  };

  _renderSpouseNik = () => {
    const { spouseNik } = this.state;
    const counter = spouseNik.length;
    return (
      <View style={styles.formComponentsContainer}>
        <BasicTitle
          label={I18n.t('nik')}
          maxLength={16}
          counter={counter}
          keyboardType="numeric"
          onChangeText={this._handleSpouseNik}
          placeholder={I18n.t('placeholders.editSpouseNik')}
          value={spouseNik}
        />
      </View>
    );
  };

  _handleSpouseNik = async text => {
    await this.setState({ spouseNik: text });
    await this._checkEligibility();
  };

  _renderSpouseProfession = () => {
    const { spouseProfession } = this.state;
    // const pickerStyles = farmerWork < 0 ? styles.educationTextStyleEmpty : styles.educationTextStyle;
    return (
      <View style={styles.formComponentsContainer}>
        <Text style={styles.labelStyle}>{I18n.t('work')}</Text>
        <Picker
          selected={spouseProfession}
          options={work}
          onSelect={this._onSelectProfession}
          placeholder={I18n.t('placeholders.editSpouseProfession')}
        />
      </View>
    );
  };

  _onSelectProfession = async index => {
    await this.setState({
      spouseProfession: index
    });
    await this._checkEligibility();
  };

  _renderSpouseIncome = () => {
    const { spouseIncome } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <BasicTitle
          value={spouseIncome}
          label={I18n.t('allowancePerMonth')}
          maxLength={30}
          onChangeText={this._handleSpouseIncome}
          placeholder="0"
          keyboardType="numeric"
        />
      </View>
    );
  };

  _handleSpouseIncome = async text => {
    await this.setState({ spouseIncome: text });
    await this._checkEligibility();
  };

  _renderSpousePlaceOfBirth = () => {
    const { spousePlaceOfBirth } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <BasicTitle
          label={I18n.t('placeOfBirth')}
          onChangeText={this._handleSpousePlaceOfBirth}
          placeholder={I18n.t('placeholders.editSpousePlaceOfBirth')}
          value={spousePlaceOfBirth}
        />
      </View>
    );
  };

  _handleSpousePlaceOfBirth = async text => {
    await this.setState({ spousePlaceOfBirth: text });
    await this._checkEligibility();
  };

  _renderDOB = () => {
    const { spouseDateOfBirth, openDatePicker } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <Text style={styles.labelStyle}>{I18n.t('dateOfBirth')}</Text>
        <TouchableOpacity style={styles.dobButton} onPress={this._onOpenDatePicker}>
          {spouseDateOfBirth && (
            <Text style={styles.dobText}>{formatDate(spouseDateOfBirth, 'DD/MM/YYYY')}</Text>
          )}
          {!spouseDateOfBirth && <Text style={styles.dobTextEmpty}>DD/MM/YY</Text>}
          {openDatePicker ? <SvgTick main /> : <SvgCalendar />}
        </TouchableOpacity>
        {openDatePicker && (
          <Animatable.View animation="fadeIn" style={styles.datePickerContainer}>
            <DatePicker
              locale={deviceLanguage}
              mode="date"
              maximumDate={new Date()}
              date={new Date(spouseDateOfBirth)}
              onDateChange={date => this.setState({ spouseDateOfBirth: date })}
            />
          </Animatable.View>
        )}
      </View>
    );
  };

  _onOpenDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({ openDatePicker: !openDatePicker });
  };

  _onPressSave = async () => {
    const {
      spouseName,
      farmerId,
      spouseProfession,
      spouseNik,
      spousePlaceOfBirth,
      spouseDateOfBirth,
      spouseIncome
    } = this.state;
    const params = {
      farmerSpouseDetail: {
        spouseName,
        spouseProfession,
        spouseNik,
        spousePlaceOfBirth,
        spouseDateOfBirth,
        spouseIncome
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
        <HeaderDetail close title={I18n.t('spouseDetail')} onPressClose={() => this._onPressClose()} />
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
          {this._renderSpouseName()}
          {this._renderSpouseNik()}
          {this._renderSpouseProfession()}
          {this._renderSpouseIncome()}
          {this._renderDOB()}
          {this._renderSpousePlaceOfBirth()}
          {isVisibleEdit && this._renderModalEdit()}
          {isSuccessModalOpen && this._renderModalSuccess()}
          <PrimaryButton
            onPress={this._onPressSave}
            customContainer={styles.button}
            size="medium"
            title={I18n.t('save')}
          />
        </ScrollView>
      </MainScreen>
    );
  }
}

SpouseEdit.propTypes = {
  navigation: PropTypes.object
};

SpouseEdit.defaultProps = {
  navigation: noop
};
