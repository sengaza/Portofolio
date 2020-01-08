import React from 'react';
import { ScrollView, StatusBar, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-date-picker';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';
import Header from '../../components/elements/Header';
import MainScreen from '../../components/layouts/MainScreen';
import PersistentAddButton from '../../components/elements/PersistentAddButton';
import styles from './AddFarmer.styles';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import I18n from '../../i18n';
import { noop, formatDate, isEmpty, deviceLanguage } from '../../utils';
import { IMAGES, ENDPOINT } from '../../configs';
import BasicTitle from '../../components/elements/BasicTitle';
import Picker from '../../components/elements/Picker';
import genderOptions from '../../fixtures/gender.json';
import educationLevels from '../../fixtures/education.json';
import RadioGroup from '../../components/elements/RadioGroup/RadioGroup';
import SvgUpload from '../../../assets/svgs/Upload';
import SvgCalendar from '../../../assets/svgs/Calendar';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import SvgTick from '../../../assets/svgs/Tick';
// import console = require('console');

export default class AddFarmer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      farmerImage: '',
      genderSelectedIndex: -1,
      educationLevel: -1,
      farmerDateOfBirth: null,
      errorMessage: null,
      farmerNik: {},
      isAddModalOpen: false,
      snackBar: false,
      openDatePicker: false
    };
  }

  componentDidMount() {
    const { onPopulate } = this.props;
    onPopulate(data => {
      const { genderId, educationLevel } = data;
      this.setState({
        genderSelectedIndex: genderOptions.findIndex(gender => gender.id === genderId),
        educationLevel
      });
    });
  }

  _openAddModal = () => {
    this.setState({ isAddModalOpen: true });
  };

  _onCloseAddModal = () => {
    this.setState({ isAddModalOpen: false });
  };

  _isInvalidToSubmit = () => {
    const {
      genderSelectedIndex,
      farmerContactNumber,
      farmerName,
      farmerNik,
      educationLevel,
      farmerDateOfBirth,
      farmerPlaceOfBirth
    } = this.state;
    return (
      genderSelectedIndex < 0 ||
      isEmpty(farmerName) ||
      farmerNik.length !== 16 ||
      educationLevel < 0 ||
      isEmpty(farmerDateOfBirth) ||
      isEmpty(farmerPlaceOfBirth) ||
      isEmpty(farmerContactNumber)
    );
  };

  _getEducationLevel = () =>
    educationLevels.map(({ name, ...rest }) => ({
      ...rest,
      name: I18n.t(name)
    }));

  _onDropdownChanged = key => value => {
    this.setState({
      [key]: value.id
    });
  };

  _onSelectGender = index => {
    this.setState({
      genderSelectedIndex: index
    });
  };

  _renderGender = () => {
    const { genderSelectedIndex } = this.state;
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.labelStyle}>{I18n.t('gender')}</Text>
        <View style={styles.radioContainer}>
          <RadioGroup
            options={genderOptions}
            spaceBetween={30}
            selectedIndex={genderSelectedIndex}
            onSelect={this._onSelectGender}
            disabled={false}
          />
        </View>
      </View>
    );
  };

  _renderEducation = () => {
    const { educationLevel } = this.state;
    const pickerStyles = educationLevel < 0 ? styles.educationTextStyleEmpty : styles.educationTextStyle;
    return (
      <View style={styles.educationContainer}>
        <Text style={styles.labelStyle}>{I18n.t('education')}</Text>
        <Picker
          customTextStyle={pickerStyles}
          selected={educationLevel}
          options={educationLevels}
          onSelect={this._onSelectVillage}
          placeholder={I18n.t('placeholders.addFarmerEducation')}
        />
      </View>
    );
  };

  _renderDOB = () => {
    const { farmerDateOfBirth, openDatePicker } = this.state;
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.labelStyle}>{I18n.t('dateOfBirth')}</Text>
        <TouchableOpacity style={styles.dobButton} onPress={this._onOpenDatePicker}>
          {farmerDateOfBirth && (
            <Text style={styles.dobText}>{formatDate(farmerDateOfBirth, 'DD/MM/YYYY')}</Text>
          )}
          {!farmerDateOfBirth && <Text style={styles.dobTextEmpty}>DD/MM/YY</Text>}
          {/* <Text style={styles.dobTextEmpty}>DD/MM/YY</Text> */}
          {openDatePicker ? <SvgTick main /> : <SvgCalendar />}
        </TouchableOpacity>
        {openDatePicker && (
          <Animatable.View animation="fadeIn" style={styles.datePickerContainer}>
            <DatePicker
              locale={deviceLanguage}
              mode="date"
              maximumDate={new Date()}
              date={new Date(farmerDateOfBirth)}
              onDateChange={date => this.setState({ farmerDateOfBirth: date })}
            />
          </Animatable.View>
        )}
      </View>
    );
  };

  _onSelectVillage = index => {
    this.setState({
      educationLevel: index
    });
  };

  _handleName = async text => {
    await this.setState({ farmerName: text });
  };

  _handleNik = async text => {
    await this.setState({ farmerNik: text });
  };

  _handlePoB = async text => {
    await this.setState({ farmerPlaceOfBirth: text });
  };

  _handleContactNumber = async text => {
    await this.setState({ farmerContactNumber: text });
  };

  _onOpenDatePicker = () => {
    const { openDatePicker } = this.state;
    this.setState({ openDatePicker: !openDatePicker });
  };

  _renderModalSuccess = () => (
    <View>
      <ModalConfirmation
        isVisible={this.state.isAddModalOpen}
        onPressYes={this._onPressRightButton}
        onPressNo={this._onPressLeftButton}
        leftOption={I18n.t('farmerAddLater')}
        rightOption={I18n.t('farmerAddOk')}
        title={I18n.t('great')}
        description={I18n.t('farmerAddSuccess')}
      />
    </View>
  );

  _onAddFarmer = async () => {
    const {
      farmerName,
      farmerNik,
      farmerPlaceOfBirth,
      farmerContactNumber,
      farmerImage,
      farmerDateOfBirth,
      educationLevel,
      genderSelectedIndex
    } = this.state;
    const params = {
      farmerImage,
      farmerName,
      farmerContactNumber,
      farmerNik,
      farmerPlaceOfBirth,
      farmerDateOfBirth,
      farmerEducation: educationLevel,
      farmerGender: genderSelectedIndex
    };
    try {
      this.setState({ loading: true });
      this.setState({ isAddModalOpen: false });
      const result = await ENDPOINT.createFarmerMandiri(params);
      if (result.success === true) {
        this.setState({ isAddModalOpen: true, farmerId: result.data.farmerId });
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

  _onPressLeftButton = () => {
    this.setState({ isAddModalOpen: false });
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'FarmerData' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _onPressRightButton = () => {
    const { farmerId } = this.state;
    this.setState({ isAddModalOpen: false });
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

  _renderForm = () => {
    const { farmerImage, errorMessage, farmerNik, farmerPlaceOfBirth, farmerName } = this.state;
    const counter = farmerNik.length;
    return (
      <View style={styles.formContainer}>
        <View style={styles.uploadContainer}>
          <View style={styles.photoContainer}>
            <TouchableOpacity onPress={noop} style={styles.uploadButtonStyle}>
              {farmerImage === '' ? (
                <View>
                  <Image source={IMAGES.ava} style={styles.profileTemplate} />
                </View>
              ) : (
                <Image style={styles.profileTemplate} source={{ uri: farmerImage }} resizeMode="cover" />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.photoTextContainer}>
            <SvgUpload />
            <Text onPress={noop} style={styles.uploadTextStyle}>
              {I18n.t('uploadFarmerPhoto')}
            </Text>
          </View>
        </View>
        <BasicTitle
          placeholder={I18n.t(`placeholders.addFarmerName`)}
          customContainer={styles.inputStyle}
          label={I18n.t('farmerName')}
          onChangeText={this._handleName}
          customTextInput={styles.titleStyle}
          value={farmerName}
        />

        <BasicTitle
          placeholder={I18n.t(`placeholders.addFarmerNik`)}
          counter={counter}
          customContainer={styles.inputStyle}
          label={I18n.t('nik')}
          onChangeText={this._handleNik}
          keyboardType="numeric"
          maxLength={16}
          errorMessage={errorMessage}
          onEndEditing={this._checkNik}
          value={farmerNik}
        />
        {this._renderGender()}
        {this._renderDOB()}
        <BasicTitle
          placeholder={I18n.t(`placeholders.addFarmerPoB`)}
          customContainer={styles.inputStyle}
          label={I18n.t('placeOfBirth')}
          onChangeText={this._handlePoB}
          value={farmerPlaceOfBirth}
        />
        {this._renderEducation()}
        <BasicTitle
          placeholder={I18n.t(`placeholders.addFarmerPhone`)}
          customContainer={styles.inputStyle}
          label={I18n.t('phone')}
          onChangeText={this._handleContactNumber}
          maxLength={13}
          keyboardType="numeric"
        />
      </View>
    );
  };

  render() {
    const { loading, isAddModalOpen, message, snackBar } = this.state;

    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <Header back title={I18n.t('addFarmer')} />
        <View style={styles.scrollContainer}>
          <SnackBar
            position="top"
            visible={snackBar}
            backgroundColor={COLOR_EVENT_ERROR}
            titleMessage={I18n.t('error.addFarmer')}
            textMessage={message}
            onPressClose={this._handleSnackBar}
          />

          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            {/* {this._renderDetail()}
          <Text style={styles.guideText}>{I18n.t('completionGuide')}</Text>
          {this._renderProgressBar()} */}
            {this._renderForm()}
          </ScrollView>
        </View>

        <PersistentAddButton
          disabled={this._isInvalidToSubmit()}
          left
          onPress={this._onAddFarmer}
          title={I18n.t('addFarmer')}
          // disabled={disableButton}
        />
        {isAddModalOpen && this._renderModalSuccess()}
      </MainScreen>
    );
  }
}

AddFarmer.propTypes = {
  navigation: PropTypes.object,
  onPopulate: PropTypes.object
};

AddFarmer.defaultProps = {
  navigation: noop,
  onPopulate: noop
};
