import React from 'react';
import { View, Text, StatusBar, ScrollView, BackHandler, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-date-picker';
import * as Animatable from 'react-native-animatable';
import _ from 'lodash';
import styles from './WorkEdit.styles';
import I18n from '../../i18n';
import PrimaryButton from '../../components/elements/PrimaryButton';
import MainScreen from '../../components/layouts/MainScreen';
import HeaderDetail from '../../components/elements/HeaderDetail';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import work from '../../fixtures/work.json';
import { noop, formatDate, deviceLanguage } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import Picker from '../../components/elements/Picker';
import BasicTitle from '../../components/elements/BasicTitle';
import SvgCalendar from '../../../assets/svgs/Calendar';
import SvgTick from '../../../assets/svgs/Tick';

export default class WorkEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0,
      loading: false,
      farmerWork: -1,
      farmerWorkAddress: '',
      isSuccessModalOpen: false,
      snackBar: false,
      message: '',
      farmerIncome: 0,
      isVisibleEdit: false,
      isChanged: false,
      data: {},
      openDatePicker: false
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
      farmerWork: data.farmerWork,
      farmerWorkAddress: data.farmerWorkAddress,
      farmerWorkSince: data.farmerWorkSince === '' ? null : data.farmerWorkSince,
      farmerIncome: data.farmerIncome
    });
  };

  _renderFarmerWork = () => {
    const { farmerWork } = this.state;
    // const pickerStyles = farmerWork < 0 ? styles.educationTextStyleEmpty : styles.educationTextStyle;
    return (
      <View style={styles.formComponentsContainer}>
        <Text style={styles.labelStyle}>{I18n.t('work')}</Text>
        <Picker
          selected={farmerWork}
          options={work}
          onSelect={this._onSelectWork}
          placeholder={I18n.t('placeholders.editFarmerWork')}
        />
      </View>
    );
  };

  _onSelectWork = async index => {
    await this.setState({
      farmerWork: index
    });
    await this._checkEligibility();
  };

  _onPressSave = async () => {
    const { farmerWork, farmerId, farmerWorkAddress, farmerWorkSince, farmerIncome } = this.state;
    const params = {
      farmerWorkDetail: {
        farmerWork,
        farmerWorkAddress,
        farmerWorkSince,
        farmerIncome
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

  _checkEligibility = () => {
    const { farmerWork, farmerWorkAddress, farmerWorkSince, farmerIncome, data } = this.state;
    if (
      farmerWork === data.farmerWork &&
      farmerWorkAddress === data.farmerWorkAddress &&
      farmerWorkSince === data.farmerWorkSince &&
      farmerIncome === data.farmerIncome
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };

  _handleWorkAddress = async text => {
    await this.setState({ farmerWorkAddress: text });
    await this._checkEligibility();
  };

  _renderAddress = () => {
    const { farmerWorkAddress } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <BasicTitle
          label={I18n.t('workAddress')}
          onChangeText={this._handleWorkAddress}
          placeholder={I18n.t('placeholders.editWorkAddress')}
          value={farmerWorkAddress}
        />
      </View>
    );
  };

  _handleIncome = async text => {
    await this.setState({ farmerIncome: text });
    await this._checkEligibility();
  };

  _renderIncome = () => {
    const { farmerIncome } = this.state;
    return (
      <View style={styles.formComponentsContainer}>
        <BasicTitle
          label={I18n.t('allowancePerMonth')}
          maxLength={30}
          onChangeText={this._handleIncome}
          placeholder="0"
          keyboardType="numeric"
          value={farmerIncome}
        />
      </View>
    );
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

  _onOpenDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({ openDatePicker: !openDatePicker });
    this._checkEligibility();
  };

  _renderWorkSince = () => {
    const { farmerWorkSince, openDatePicker } = this.state;
    return (
      <View style={styles.workSince}>
        <Text style={styles.labelStyle}>{I18n.t('workSince')}</Text>
        <TouchableOpacity style={styles.dobButton} onPress={this._onOpenDatePicker}>
          {farmerWorkSince && <Text style={styles.dobText}>{formatDate(farmerWorkSince, 'MMM YYYY')}</Text>}
          {!farmerWorkSince && <Text style={styles.dobTextEmpty}>DD/MM/YY</Text>}
          {/* <Text style={styles.dobTextEmpty}>DD/MM/YY</Text> */}
          {openDatePicker ? <SvgTick main /> : <SvgCalendar />}
        </TouchableOpacity>
        {openDatePicker && (
          <Animatable.View animation="fadeIn" style={styles.datePickerContainer}>
            <DatePicker
              locale={deviceLanguage}
              mode="date"
              maximumDate={new Date()}
              date={new Date(farmerWorkSince)}
              onDateChange={date => this.setState({ farmerWorkSince: date })}
            />
          </Animatable.View>
        )}
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
        <HeaderDetail close title={I18n.t('workDetail')} onPressClose={() => this._onPressClose()} />
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
          {this._renderFarmerWork()}
          {this._renderAddress()}
          {this._renderWorkSince()}
          {this._renderIncome()}
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
