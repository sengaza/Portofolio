import React from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import PropTypes from 'prop-types';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import I18n from '../../i18n';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import styles from './ApplyLoan.styles';
import FarmerCard from '../../components/elements/FarmerCard';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import LandCard from '../../components/elements/LandCard';
import BasicTitle from '../../components/elements/BasicTitle';
import Picker from '../../components/elements/Picker';
import duration from '../../fixtures/duration.json';
import PersistentAddButton from '../../components/elements/PersistentAddButton';
import { isEmpty, noop, formatNumberWithDot, convertToNumber } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import CheckBox from '../../components/elements/CheckBox';
import SnackBar from '../../components/elements/SnackBar';

export default class ApplyLoan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      plantingSeasonDetail: {},
      loanAmount: 0,
      limitIndicative: 0,
      selectedDuration: -1,
      loanPlantingSeasonIds: [],
      loading: false,
      checkList: [{ id: 0, text: I18n.t('agreement') }],
      agreed: false
      //   disableButton: true
      // isNew: true
    };
  }
  componentDidMount() {
    this._getParams();
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
    this._createCheckBox();
  }

  _getParams = async () => {
    const farmerLoanId = await _.get(this.props.navigation.state, 'params.farmerLoanId', '');
    this.setState({
      farmerLoanId
    });
    this._getData();
  };

  _getData = async () => {
    const { farmerLoanId } = this.state;
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getLoanByFarmerId(farmerLoanId);
      console.log(result.data);
      this.setState({
        data: result.data,
        plantingSeasonDetail: result.data.plantingSeasonDetail,
        loanPlantingSeasonIds: result.data.loanPlantingSeasonIds,
        loanFarmerId: result.data.loanFarmerId,
        limitIndicative: result.data.limitIndicative
      });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _renderLandData = () => {
    const { plantingSeasonDetail } = this.state;
    const { firstPlantingSeasonName, countPlantingSeason, totalSizePlantingSeason } = plantingSeasonDetail;
    let plantingSeasonText = firstPlantingSeasonName;
    if (countPlantingSeason > 1) {
      plantingSeasonText = `${firstPlantingSeasonName} ${I18n.t('and')} ${countPlantingSeason - 1} ${I18n.t(
        'otherLands'
      )}`;
    }

    return (
      <View>
        <View style={styles.landDataContainer}>
          <Text style={styles.smallLabel}>{I18n.t('LandData')}</Text>
        </View>
        <View>
          <LandCard
            bottomLeftText={totalSizePlantingSeason}
            bottomRightText=""
            image=""
            // onPress={this._onPressDetail(plantingSeasonId)}
            topText={plantingSeasonText}
          />
        </View>
      </View>
    );
  };

  _renderPeriodePicker = () => {
    const { selectedDuration } = this.state;
    return (
      <View style={styles.periodePickerContainer}>
        <Text style={styles.labelStyle}>{I18n.t('periode')}</Text>
        <Picker onSelect={this._onSelectDuration} options={duration} selected={selectedDuration} />
      </View>
    );
  };

  _onSelectDuration = index => {
    this.setState({ selectedDuration: index });
  };

  _renderLoanInfo = () => (
    <View>
      <View style={styles.programTypeContainer}>
        <Text style={styles.smallLabel}>{I18n.t('programType')}</Text>
        <Text style={styles.programBody}>KUR Bank Mandiri</Text>
      </View>
    </View>
  );

  _renderLoanAmount = () => {
    const { loanAmount, limitIndicative } = this.state;
    return (
      <View style={styles.loanAmountContainer}>
        <BasicTitle
          label={I18n.t('loanAmount')}
          // maxLength={30}
          errorMessage={`${I18n.t('maxRp')} ${formatNumberWithDot(limitIndicative)}`}
          keyboardType="numeric"
          onChangeText={this._handleLoanChange}
          placeholder="0"
          value={`Rp. ${formatNumberWithDot(loanAmount)}`}
        />
      </View>
    );
  };

  _handleLoanChange = async text => {
    const { limitIndicative } = this.state;
    let inputtedLoan = convertToNumber(text);
    if (inputtedLoan > limitIndicative) {
      inputtedLoan = limitIndicative;
    }
    this.setState({ loanAmount: inputtedLoan });
  };

  _isInvalidToSubmit = () => {
    const { loanAmount, loanPlantingSeasonIds, farmerLoanId, agreed } = this.state;
    return loanAmount <= 0 || isEmpty(farmerLoanId) || isEmpty(loanPlantingSeasonIds) || agreed === false;
  };

  _renderConfirmationModal = () => (
    <View>
      <ModalConfirmation
        isVisible={this.state.isSubmitModalOpen}
        onPressYes={this._onPressYes}
        onPressNo={this._onPressNo}
        leftOption={I18n.t('no')}
        rightOption={I18n.t('yes')}
        title={I18n.t('confirmation')}
        description={I18n.t('submissionConfirmation')}
      />
    </View>
  );

  _renderModalSuccess = () => (
    <View>
      <ModalConfirmation
        type
        isVisible={this.state.isSuccessModalOpen}
        onPressYes={this._onPressOk}
        rightOption={I18n.t('ok')}
        title={I18n.t('great')}
        description={I18n.t('submissionSubmitted')}
      />
    </View>
  );

  _onSubmitLoan = () => {
    this.setState({ isSubmitModalOpen: true });
  };

  // _onPressNo =
  _onPressYes = async () => {
    const { loanFarmerId, loanAmount, loanPlantingSeasonIds } = this.state;
    const params = {
      loanFarmerId,
      loanRequestedAmount: loanAmount,
      loanPlantingSeasonIds
    };
    try {
      this.setState({ loading: true, isSubmitModalOpen: false });
      const result = await ENDPOINT.submitLoan(params);
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

  _onPressNo = () => {
    this.setState({ isSubmitModalOpen: false, isSuccessModalOpen: false });
  };

  _createCheckBox() {
    const { checkList } = this.state;
    const tempData = [];
    for (let i = 0; i < checkList.length; i += 1) {
      tempData.push(false);
    }
    this.setState({ checked: tempData });
  }

  _renderAgreement = () => {
    const { checkList = [], checked = [] } = this.state;

    return (
      <View style={styles.agreementOuterContainer}>
        {checkList.map((value, index) => (
          <View style={styles.agreementContainer} key={value.id}>
            <CheckBox selected={checked[index]} onSelect={this._handleCheckBox(index)} />
            <Text style={styles.agreementText}>{value.text}</Text>
          </View>
        ))}
      </View>
    );
  };

  _onPressOk = () => {
    const { loanFarmerId } = this.state;
    this.setState({ isSuccessModalOpen: false });
    const resetAction = NavigationActions.reset({
      index: 2,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'FarmerData' }),
        NavigationActions.navigate({ routeName: 'FarmerProfile', params: { farmerId: loanFarmerId } })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _handleCheckBox = index => async () => {
    const tempData = this.state.checked;
    tempData[index] = !tempData[index];

    await this.setState({ checked: tempData });
    if (tempData.includes(true)) {
      this.setState({ agreed: true });
    } else {
      this.setState({ agreed: false });
    }
  };
  render() {
    const { data, loading, snackBar, message } = this.state;
    const { loanFarmerName, loanFarmerNik, loanStatus } = data;
    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <Header title={I18n.t('ApplyLoan')} />
        <View style={styles.scrollContainer}>
          <SnackBar
            position="top"
            visible={snackBar}
            backgroundColor={COLOR_EVENT_ERROR}
            titleMessage={I18n.t('error.applyLoan')}
            textMessage={message}
            onPressClose={this._handleSnackBar}
          />

          <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
            <FarmerCard
              topLeft={loanFarmerName}
              bottomLeft={loanFarmerNik}
              farmerImage=""
              topRight={loanStatus}
            />
            {this._renderLandData()}
            {this._renderLoanInfo()}
            {this._renderLoanAmount()}
            {this._renderAgreement()}
            {/* {this._renderPeriodePicker()} */}
          </ScrollView>
          <PersistentAddButton
            disabled={this._isInvalidToSubmit()}
            onPress={this._onSubmitLoan}
            title={I18n.t('submitLoan')}
            // disabled={disableButton}
          />
          {this._renderConfirmationModal()}
          {this._renderModalSuccess()}
        </View>
      </MainScreen>
    );
  }
}

ApplyLoan.propTypes = {
  navigation: PropTypes.object
};

ApplyLoan.defaultProps = {
  navigation: noop
};
