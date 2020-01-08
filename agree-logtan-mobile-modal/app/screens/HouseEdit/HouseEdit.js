import React from 'react';
import { View, Text, StatusBar, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DatePicker from 'react-native-date-picker';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './HouseEdit.styles';
import I18n from '../../i18n';
import PrimaryButton from '../../components/elements/PrimaryButton';
import MainScreen from '../../components/layouts/MainScreen';
import HeaderDetail from '../../components/elements/HeaderDetail';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { noop, convertPickerOption, formatDate, deviceLanguage } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import ModalListPicker from '../../components/elements/ModalListPicker';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import BasicTitle from '../../components/elements/BasicTitle';
import PickerPlain from '../../components/elements/PickerPlain';
import Picker from '../../components/elements/Picker';
import SvgCalendar from '../../../assets/svgs/Calendar';
import ownershipOption from '../../fixtures/ownership.json';
import SvgTick from '../../../assets/svgs/Tick';

export default class HouseEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0,
      loading: false,
      isSuccessModalOpen: false,
      snackBar: false,
      message: '',
      province: [],
      district: [],
      subDistrict: [],
      village: [],
      selectedProvince: -1,
      selectedDistrict: -1,
      selectedSubDistrict: -1,
      selectedVillage: -1,
      openDatePicker: false,
      selectedOwnership: -1,
      farmerHouseAddress: '',
      farmerHouseZipCode: '',
      farmerHouseRtRw: '',
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
    this._getAllProvince();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onPressClose);
  }

  _getParams = async () => {
    // const bankId = _.get(this.props.navigation.state, 'params.bankId', '');
    // const bankName = _.find(bank, { id: bankId }).name;
    const farmerId = _.get(this.props.navigation.state, 'params.farmerId', '');
    const data = _.get(this.props.navigation.state, 'params.data', '');
    await this.setState({
      data,
      farmerId,
      farmerHouseAddress: data.farmerHouseAddress,
      farmerHouseRtRw: data.farmerHouseRtRw,
      farmerHouseZipCode: data.farmerHouseZipCode,
      farmerHouseLivedSince: data.farmerHouseLivedSince === '' ? null : data.farmerHouseLivedSince,
      selectedProvinceId: data.farmerHouseProvince,
      selectedDistrictId: data.farmerHouseDistrict,
      selectedSubDistrictId: data.farmerHouseSubDistrict,
      selectedVillageId: data.farmerHouseVillage,
      selectedOwnership: data.farmerHouseOwnershipStatus
    });
  };

  _checkEligibility = () => {
    const {
      farmerHouseAddress,
      farmerHouseRtRw,
      farmerHouseProvince,
      farmerHouseDistrict,
      farmerHouseSubDistrict,
      farmerHouseVillage,
      farmerHouseZipCode,
      farmerHouseOwnershipStatus,
      farmerHouseLivedSince,
      data
    } = this.state;
    if (
      farmerHouseAddress === data.farmerHouseAddress &&
      farmerHouseRtRw === data.farmerHouseRtRw &&
      farmerHouseProvince === data.farmerHouseProvince &&
      farmerHouseDistrict === data.farmerHouseDistrict &&
      farmerHouseSubDistrict === data.farmerHouseSubDistrict &&
      farmerHouseVillage === data.farmerHouseVillage &&
      farmerHouseZipCode === data.farmerHouseZipCode &&
      farmerHouseOwnershipStatus === data.farmerHouseOwnershipStatus &&
      farmerHouseLivedSince === data.farmerHouseLivedSince
    ) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
  };

  async _getAllProvince() {
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getProvince();
      if (result.success === true) {
        await this.setState({ province: convertPickerOption(result.data, 'province') });
      }
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
    await this._checkEligibility();
  }

  async _getDistrict() {
    const { selectedProvinceId } = this.state;
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getDistrictByProvinceId(selectedProvinceId);
      if (result.success === true) {
        await this.setState({ district: convertPickerOption(result.data, 'district') });
      }
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
    await this._checkEligibility();
  }

  async _getSubDistrict() {
    const { selectedDistrictId } = this.state;
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getSubDistrictByDistrictId(selectedDistrictId);
      if (result.success === true) {
        await this.setState({ subDistrict: convertPickerOption(result.data, 'subDistrict') });
      }
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
    await this._checkEligibility();
  }

  async _getVillage() {
    const { selectedSubDistrictId } = this.state;
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getVillageBySubDistrictId(selectedSubDistrictId);
      if (result.success === true) {
        await this.setState({ village: convertPickerOption(result.data, 'village') });
      }
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
    await this._checkEligibility();
  }

  _onSelectProvince = async index => {
    const { province } = this.state;
    await this.setState({
      selectedProvince: province[index].id,
      selectedProvinceId: province[index].provinceId,
      // selectedProvinceName: province[index].name,
      // selectedDistrictName: '',
      // selectedSubDistrictName: '',
      // selectedVillageName: '',
      selectedDistrict: -1,
      selectedSubDistrict: -1,
      selectedVillage: -1,
      selectedVillageId: -1,
      district: [],
      subDistrict: [],
      village: []
    });
    this._getDistrict();
    await this._checkEligibility();
  };

  _onSelectDistrict = async index => {
    const { district } = this.state;
    await this.setState({
      selectedDistrict: district[index].id,
      selectedDistrictId: district[index].districtId,
      // selectedDistrictName: district[index].name,
      // selectedSubDistrictName: '',
      // selectedVillageName: '',
      selectedSubDistrict: -1,
      selectedVillage: -1,
      subDistrict: [],
      village: []
    });
    this._getSubDistrict();
    await this._checkEligibility();
  };

  _onSelectSubDistrict = async index => {
    const { subDistrict } = this.state;
    await this.setState({
      selectedSubDistrict: subDistrict[index].id,
      selectedSubDistrictId: subDistrict[index].subDistrictId,
      // selectedSubDistrictName: subDistrict[index].name,
      // selectedVillageName: '',
      selectedVillage: -1,
      village: []
    });
    this._getVillage();
    await this._checkEligibility();
  };

  _onSelectVillage = async index => {
    const { village } = this.state;
    await this.setState({
      selectedVillage: village[index].id,
      selectedVillageId: village[index].villageId
      // selectedVillageName: village[index].name
    });
  };

  _onSelectOwnership = async index => {
    await this.setState({
      selectedOwnership: ownershipOption[index].id
    });
    await this._checkEligibility();
  };

  _onOpenDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({ openDatePicker: !openDatePicker });
    this._checkEligibility();
  };

  _handleAddress = async text => {
    this.setState({ farmerHouseAddress: text });
    await this._checkEligibility();
  };

  _handlePostalCode = async text => {
    this.setState({ farmerHouseZipCode: text });
    await this._checkEligibility();
  };

  _handleRtrw = async text => {
    this.setState({ farmerHouseRtRw: text });
    await this._checkEligibility();
  };

  _onPressSave = async () => {
    const {
      farmerHouseZipCode,
      farmerHouseLivedSince,
      selectedOwnership,
      farmerHouseAddress,
      farmerHouseRtRw,
      selectedProvinceId,
      selectedDistrictId,
      selectedSubDistrictId,
      selectedVillageId,
      farmerId
    } = this.state;
    const params = {
      farmerHouseDetail: {
        farmerHouseAddress,
        farmerHouseRtRw,
        farmerHouseProvince: selectedProvinceId,
        farmerHouseDistrict: selectedDistrictId,
        farmerHouseSubDistrict: selectedSubDistrictId,
        farmerHouseVillage: selectedVillageId,
        farmerHouseZipCode,
        farmerHouseOwnershipStatus: selectedOwnership,
        farmerHouseLivedSince
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
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'FarmerData' }),
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

  _renderModalListPicker() {
    return (
      <View>
        <ModalListPicker isVisible />
      </View>
    );
  }

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

  _renderForm() {
    const {
      province = [],
      district = [],
      subDistrict = [],
      village = [],
      selectedProvince,
      selectedDistrict,
      selectedSubDistrict,
      selectedVillage,
      selectedOwnership,
      farmerHouseAddress,
      farmerHouseZipCode,
      farmerHouseRtRw,
      farmerHouseLivedSince,
      openDatePicker
    } = this.state;
    return (
      <View>
        <BasicTitle
          placeholder={I18n.t(`placeholders.editWorkAddress`)}
          customContainer={styles.inputStyle}
          label={I18n.t('address')}
          onChangeText={this._handleAddress}
          // customTextInput={styles.titleStyle}
          value={farmerHouseAddress}
        />
        <View style={styles.pickerStyle}>
          <Text style={styles.labelStyle}>{I18n.t('provice')}</Text>
          <PickerPlain
            placeholder={I18n.t(`placeholders.editProvince`)}
            selected={selectedProvince}
            options={province}
            onSelect={this._onSelectProvince}
          />
        </View>
        {selectedProvince > -1 && (
          <Animatable.View animation="slideInLeft" style={styles.pickerStyle}>
            <Text style={styles.labelStyle}>{I18n.t('city')}</Text>
            <PickerPlain
              placeholder={I18n.t(`placeholders.editDistrict`)}
              selected={selectedDistrict}
              options={district}
              onSelect={this._onSelectDistrict}
            />
          </Animatable.View>
        )}
        {selectedDistrict > -1 && (
          <Animatable.View animation="slideInLeft" style={styles.pickerStyle}>
            <Text style={styles.labelStyle}>{I18n.t('district')}</Text>
            <PickerPlain
              placeholder={I18n.t(`placeholders.editSubDistrict`)}
              selected={selectedSubDistrict}
              options={subDistrict}
              onSelect={this._onSelectSubDistrict}
            />
          </Animatable.View>
        )}
        {selectedSubDistrict > -1 && (
          <Animatable.View animation="slideInLeft" style={styles.pickerStyle}>
            <Text style={styles.labelStyle}>{I18n.t('village')}</Text>
            <PickerPlain
              placeholder={I18n.t(`placeholders.editVillage`)}
              selected={selectedVillage}
              options={village}
              onSelect={this._onSelectVillage}
            />
          </Animatable.View>
        )}

        <BasicTitle
          placeholder={I18n.t(`placeholders.editPostalCode`)}
          customContainer={styles.inputStyle}
          label={I18n.t('postalCode')}
          onChangeText={this._handlePostalCode}
          // customTextInput={styles.titleStyle}
          value={farmerHouseZipCode}
          keyboardType="numeric"
        />
        <View style={styles.pickerStyle}>
          <Text style={styles.labelStyle}>{I18n.t('ownershipStatus')}</Text>
          <Picker
            placeholder={I18n.t(`placeholders.editOwnership`)}
            selected={selectedOwnership}
            options={ownershipOption}
            onSelect={this._onSelectOwnership}
          />
        </View>
        <View style={styles.pickerStyle}>
          <Text style={styles.labelStyle}>{I18n.t('livedSince')}</Text>
          <TouchableOpacity style={styles.dobButton} onPress={this._onOpenDatePicker}>
            {farmerHouseLivedSince && (
              <Text style={styles.dobText}>{formatDate(farmerHouseLivedSince, 'DD/MM/YYYY')}</Text>
            )}
            {!farmerHouseLivedSince && <Text style={styles.dobTextEmpty}>DD/MM/YY</Text>}
            {/* <Text style={styles.dobTextEmpty}>DD/MM/YY</Text> */}
            {openDatePicker ? <SvgTick main /> : <SvgCalendar />}
          </TouchableOpacity>
          {openDatePicker && (
            <Animatable.View animation="fadeIn" style={styles.datePickerContainer}>
              <DatePicker
                locale={deviceLanguage}
                mode="date"
                maximumDate={new Date()}
                date={new Date(farmerHouseLivedSince)}
                onDateChange={date => this.setState({ farmerHouseLivedSince: date })}
              />
            </Animatable.View>
          )}
        </View>
        <BasicTitle
          placeholder={I18n.t(`placeholders.editRtrw`)}
          customContainer={styles.inputStyle}
          label={I18n.t('rtrw')}
          onChangeText={this._handleRtrw}
          // customTextInput={styles.titleStyle}
          value={farmerHouseRtRw}
        />
        <PrimaryButton
          onPress={this._onPressSave}
          customContainer={styles.button}
          size="medium"
          title={I18n.t('save')}
        />
      </View>
    );
  }

  render() {
    const { isSuccessModalOpen, isVisibleEdit, loading, snackBar, message } = this.state;
    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <HeaderDetail close title={I18n.t('houseDetail')} onPressClose={() => this._onPressClose()} />

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
          {this._renderForm()}
          {isVisibleEdit && this._renderModalEdit()}
          {isSuccessModalOpen && this._renderModalSuccess()}
          {/* {this._renderModalListPicker()} */}
        </ScrollView>
        {/* <View style={styles.buttonArea}>
          
        </View> */}
      </MainScreen>
    );
  }
}

HouseEdit.propTypes = {
  navigation: PropTypes.object
};

HouseEdit.defaultProps = {
  navigation: noop
};
