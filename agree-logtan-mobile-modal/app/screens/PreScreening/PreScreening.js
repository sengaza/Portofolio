import React from 'react';
import { View, StatusBar, ScrollView, Image, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import _ from 'lodash';
import styles from './PreScreening.styles';
import I18n from '../../i18n';
import MainScreen from '../../components/layouts/MainScreen';
import HeaderDetail from '../../components/elements/HeaderDetail';
import { COLOR_WHITE, COLOR_EVENT_ERROR } from '../../styles';
import { noop, formatDate, roundNum } from '../../utils';
import ModalConfirmation from '../../components/elements/ModalConfirmation';
import CheckBox from '../../components/elements/CheckBox';
import { ENDPOINT, IMAGES } from '../../configs';
import errors from '../../utils/errors';
import SnackBar from '../../components/elements/SnackBar';
import PersistentAddButton from '../../components/elements/PersistentAddButton';

export default class BankDetailEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0,
      loading: false,
      farmerBankName: '',
      farmerCardNumber: '',
      isSuccessModalOpen: false,
      snackBar: false,
      message: '',
      isVisibleEdit: false,
      isChanged: false,
      data: [],
      buttonDisabled: true
    };
  }

  async componentDidMount() {
    await this._getParams();
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
    await this._getData();
    await this._createCheckBox();
  }

  _createCheckBox() {
    const { data } = this.state;
    const tempData = [];
    for (let i = 0; i < data.length; i += 1) {
      tempData.push(false);
    }
    this.setState({ checked: tempData });
  }

  _getData = async () => {
    const { farmerId } = this.state;

    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getLandList(farmerId, true);
      await this.setState({ data: result.data });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _getParams = () => {
    const farmerId = _.get(this.props.navigation.state, 'params.farmerId', '');
    this.setState({
      farmerId
    });
  };

  _checkEligibility = () => {
    const { farmerBankName, farmerCardNumber, data } = this.state;
    if (farmerBankName === data.farmerBankName && farmerCardNumber === data.farmerCardNumber) {
      this.setState({ isChanged: false });
    } else {
      this.setState({ isChanged: true });
    }
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

  _onPressSave = async () => {
    const { data, farmerId, checked } = this.state;
    const tempData = [];
    for (let i = 0; i < data.length; i += 1) {
      if (checked[i] === true) {
        tempData.push(data[i].plantingSeasonId);
      }
    }
    const params = {
      loanFarmerId: farmerId,
      loanPlantingSeasonIds: tempData
    };
    try {
      this.setState({ loading: true, isSuccessModalOpen: false });
      const result = await ENDPOINT.createPreScreening(params);
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
        NavigationActions.navigate({ routeName: 'FarmerProfile', params: { farmerId } })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  _handleCheckBox = index => async () => {
    const tempData = this.state.checked;
    tempData[index] = !tempData[index];
    await this.setState({ checked: tempData });
    if (tempData.includes(true)) {
      this.setState({ buttonDisabled: false });
    } else {
      this.setState({ buttonDisabled: true });
    }
  };

  _renderModalEdit() {
    return (
      <View>
        <ModalConfirmation
          // type
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
          description={I18n.t('successPreScreening')}
        />
      </View>
    );
  };

  _renderList() {
    const { data = [], checked = [] } = this.state;
    return (
      <View>
        {data.map((value, index) => (
          <View style={styles.listContainer} key={value.plantingSeasonId}>
            <CheckBox selected={checked[index]} onSelect={this._handleCheckBox(index)} />
            <Image
              source={value.plantingSeasonImage ? { uri: value.plantingSeasonImage } : IMAGES.emptyLand}
              style={styles.image}
            />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.textTitle}>{value.plantingSeasonName}</Text>
              <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Text style={[styles.textHeader, { width: '45%' }]}>{I18n.t('landSize')}</Text>
                <Text style={styles.textHeader}>{I18n.t('plantingSeason')}</Text>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 3 }}>
                <Text style={[styles.textDesc, { width: '45%' }]}>
                  {value.plantingSeasonSize === '' ? '-' : roundNum(value.plantingSeasonSize * 10000)} m2
                </Text>
                <Text style={styles.textDesc}>
                  {value.plantingSeasonStartDate === ''
                    ? '-'
                    : formatDate(value.plantingSeasonStartDate, 'DD MMM YYYY')}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    );
  }

  render() {
    const { loading, snackBar, message } = this.state;
    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <HeaderDetail title={I18n.t('selectLand')} onPressClose={() => this._onPressClose()} />
        <View style={styles.snackBarContainer}>
          <SnackBar
            position="top"
            visible={snackBar}
            backgroundColor={COLOR_EVENT_ERROR}
            titleMessage={I18n.t('error.applyPreScreening')}
            textMessage={message}
            onPressClose={noop}
          />
        </View>
        <ScrollView style={styles.scrollContainer}>
          <Text style={[styles.textDesc, { paddingHorizontal: 25, paddingVertical: 10 }]}>
            {I18n.t('preScreeningHeader')}
          </Text>
          {this._renderList()}
        </ScrollView>
        <PersistentAddButton
          disabled={this.state.buttonDisabled}
          onPress={this._onPressSave}
          title={I18n.t('choose')}
        />
        {this._renderModalSuccess()}
      </MainScreen>
    );
  }
}
