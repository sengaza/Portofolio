import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import styles from './FarmerProfile.styles';
import { noop, getFirstName, formatDate } from '../../utils';
import Header from '../../components/elements/Header';
import ProgressCard from '../../components/elements/ProgressCard';
import PersistentAddButton from '../../components/elements/PersistentAddButton';
// import ListLandCard from '../../components/elements/ListLandCard';
// import HeaderForm from '../../components/elements/HeaderForm';
import I18n from '../../i18n';
import DetailCard from '../../components/elements/DetailCard';
import errors from '../../utils/errors';
import MainScreen from '../../components/layouts/MainScreen';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import { COLOR_WHITE } from '../../styles';
import { ENDPOINT } from '../../configs';
import education from '../../fixtures/education.json';
import gender from '../../fixtures/gender.json';

// import farmersDetail from '../../dummy/farmersDetail.json';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false,
      disableButton: true,
      isPreScreeningModalOpen: false,
      buttonTitle: I18n.t('applyForPreScreening')
      // isNew: true
    };
  }

  async componentWillMount() {
    await this.getParams();
  }

  async componentDidMount() {
    await this._getData();
    await this._checkEligibility();
  }

  getParams = () => {
    const farmerParams = _.get(this.props.navigation.state, 'params.farmerId', '');
    this.setState({
      farmerId: farmerParams
    });
  };

  _getData = async () => {
    const { farmerId } = this.state;
    this.setState({ loading: true });
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getMandiriFarmerById(farmerId);
      // PRESCREENING_READY -> ajukanbuttonprescreeningenabled; SUBMIT_READY -> ajukanButtonScreeningEnabled;
      // NOT_READY && field farmerStatus == PRESCREENING_PASSED -> ajukanButtonScreeningDisabled
      if (result.data.isReady === 'NOT_READY') {
        if (result.data.farmerLoanStatus === '') {
          this.setState({ disableButton: true, buttonTitle: I18n.t('applyForPreScreening') });
        }
        if (result.data.farmerLoanStatus === 'PRESCREENING_PASSED') {
          this.setState({ disableButton: true, buttonTitle: I18n.t('applyForLoan') });
        }
      }
      if (result.data.isReady === 'PRESCREENING_READY') {
        this.setState({ disableButton: false, buttonTitle: I18n.t('applyForPreScreening') });
      }
      if (result.data.isReady === 'SUBMIT_READY') {
        this.setState({ disableButton: false, buttonTitle: I18n.t('applyForLoan') });
      }
      this.setState({ data: result.data });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _openLoanModal = () => {
    this.setState({ isLoanModalOpen: true });
  };

  _openPreScreeningModal = () => {
    this.setState({ isPreScreeningModalOpen: true });
  };

  _closeModal = () => {
    this.setState({ isPreScreeningModalOpen: false, isLoanModalOpen: false });
  };

  _renderPreScreeningModal = () => (
    <View>
      <ModalConfirmation
        isVisible={this.state.isPreScreeningModalOpen}
        onPressYes={this._onPressRightButton}
        onPressNo={this._closeModal}
        leftOption={I18n.t('no')}
        rightOption={I18n.t('ok')}
        title={I18n.t('confirmation')}
        description={I18n.t('confirmationPreScreening')}
      />
    </View>
  );

  _renderLoanModal = () => {
    const { data } = this.state;
    const { farmerLoanId } = data;
    return (
      <View>
        <ModalConfirmation
          isVisible={this.state.isLoanModalOpen}
          onPressYes={this._navigateLoanActions(farmerLoanId)}
          onPressNo={this._closeModal}
          leftOption={I18n.t('no')}
          rightOption={I18n.t('ok')}
          title={I18n.t('confirmation')}
          description={I18n.t('confirmationLoan')}
        />
      </View>
    );
  };

  _onPressRightButton = async () => {
    const { data } = this.state;
    const { farmerId } = data;
    await this._closeModal();
    this.props.navigation.navigate('PreScreening', { farmerId });
  };

  _onPressLand = (farmerId, farmerLoanStatus) => () => {
    this.props.navigation.navigate('LandData', { farmerId, farmerLoanStatus });
  };

  _onPressProfileDetail = farmerId => () => {
    this.props.navigation.navigate('FarmerDetail', { farmerId });
  };

  _getGender = farmerGender => {
    const genderId = gender[farmerGender].name;
    return I18n.t(`${genderId}`);
  };

  _getEducation = farmerEducation => {
    const educationLevelId = education[farmerEducation].name;
    return I18n.t(`${educationLevelId}`);
  };

  _renderBasicInfo = () => {
    const { data } = this.state;
    const {
      farmerGender = '-',
      farmerPlaceOfBirth = '-',
      farmerDateOfBirth = '-',
      farmerEducation = '-'
    } = data;
    const formattedDate = farmerDateOfBirth === '-' ? '-' : formatDate(farmerDateOfBirth, 'DD MMM YYYY');
    const genderString = farmerGender === '-' ? '-' : this._getGender(farmerGender);
    const educationString = farmerEducation === '-' ? '-' : this._getEducation(farmerEducation);

    return (
      <View style={styles.subContainer}>
        <View style={styles.leftContainer}>
          <View style={styles.leftPart}>
            <Text style={styles.label}>{I18n.t('dateOfBirth')}</Text>
            <Text style={styles.text}>{formattedDate}</Text>
          </View>
          <View style={styles.leftPart}>
            <Text style={styles.label}>{I18n.t('gender')}</Text>
            <Text style={styles.textAddress}>{genderString}</Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.rightPart}>
            <Text style={styles.label}>{I18n.t('placeOfBirth')}</Text>
            <Text style={styles.text}>{farmerPlaceOfBirth}</Text>
          </View>
          <View style={styles.rightPart}>
            <Text style={styles.label}>{I18n.t('education')}</Text>
            <Text style={styles.text}>{educationString}</Text>
          </View>
        </View>
      </View>
    );
  };

  _renderProgressBar = () => {
    const { data } = this.state;
    const {
      farmerLandPercentage,
      farmerDetailPercentage,
      farmerDocumentPercentage,
      farmerId,
      farmerLoanStatus
    } = data;
    return (
      <View style={styles.progressCardsContainer}>
        <ProgressCard
          number={1}
          title={I18n.t('profileDetail')}
          subtitle={I18n.t('profileDetailSubtitle')}
          dataCompleted={farmerDetailPercentage}
          onPress={this._onPressProfileDetail(farmerId)}
        />
        <ProgressCard
          number={2}
          title={I18n.t('activeLand')}
          subtitle={I18n.t('activeLandSubtitle')}
          dataCompleted={farmerLandPercentage}
          onPress={this._onPressLand(farmerId, farmerLoanStatus)}
        />
        <ProgressCard
          number={3}
          title={I18n.t('document')}
          subtitle={I18n.t('documentSubtitle')}
          dataCompleted={farmerDocumentPercentage}
        />
      </View>
    );
  };

  _checkEligibility = () => {
    const { dataCompleted = {} } = this.state.data;
    if (dataCompleted.profile !== 100) {
      // this.setState({ disableButton: true });
    }
    if (dataCompleted.land !== 100) {
      // this.setState({ disableButton: true });
    }
  };

  _onPressSetAction = () => {
    const { buttonTitle } = this.state;
    if (buttonTitle === I18n.t('applyForPreScreening')) {
      this._openPreScreeningModal();
    }
    if (buttonTitle === I18n.t('applyForLoan')) {
      this._openLoanModal();
    }
  };

  _renderDetail = () => {
    // const { farmerNik = '', farmerImage = '', farmerContactNumber = '', farmerStatus = '' } = this.state.data;
    const {
      farmerNik = '',
      farmerContactNumber = '',
      farmerImage = '',
      farmerLoanStatus = ''
    } = this.state.data;

    return (
      <View style={styles.containerDetail}>
        <DetailCard
          image={farmerImage}
          textTop={farmerNik}
          textBottom={farmerContactNumber}
          status={farmerLoanStatus}
          phoneNumber={farmerContactNumber}
        />
        {this._renderBasicInfo()}
      </View>
    );
  };

  _navigateLoanActions = farmerLoanId => () => {
    this.setState({ isLoanModalOpen: false });
    this.props.navigation.navigate('ApplyLoan', { farmerLoanId });
  };

  render() {
    const { loading, disableButton, buttonTitle } = this.state;
    const { farmerName } = this.state.data;
    const farmerFirstName = getFirstName(farmerName);
    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <Header back title={farmerFirstName} search />
        {/* <View style={styles.headerContainer}>
          <HeaderForm title={I18n.t('subLabel.farmer')} back />
        </View> */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {this._renderDetail()}
          {/* {this._renderList()} */}
          <Text style={styles.guideText}>{I18n.t('completionGuide')}</Text>
          {this._renderProgressBar()}
        </ScrollView>
        <PersistentAddButton
          // disabled={disableButton}
          // left
          // onPress={this._navigateLoanActions(farmerId)}
          // title={I18n.t('applyForLoan')}
          // disabled={disableButton}
          left
          onPress={this._onPressSetAction}
          title={buttonTitle}
          disabled={disableButton}
        />
        {this._renderPreScreeningModal()}
        {this._renderLoanModal()}
      </MainScreen>
    );
  }
}

Component.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: PropTypes.object
};

Component.defaultProps = {
  navigation: noop
};
