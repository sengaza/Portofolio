import React from 'react';
import { StatusBar, ScrollView } from 'react-native';
import _ from 'lodash';
import MainScreen from '../../components/layouts/MainScreen';
import Header from '../../components/elements/Header';
import { COLOR_WHITE } from '../../styles';
import I18n from '../../i18n';
import styles from './FarmerDetail.styles';
import ProfileDetailCard from '../../components/elements/ProfileDetailCard';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import nationality from '../../fixtures/nationality.json';
import maritalStatus from '../../fixtures/maritalStatus.json';
import country from '../../fixtures/country.json';
import work from '../../fixtures/work.json';
import ownership from '../../fixtures/ownership.json';
import { formatDate } from '../../utils';

export default class FarmerDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      farmerId: 0
    };
  }
  componentDidMount() {
    this._getParams();
  }

  _getParams = async () => {
    const farmerId = await _.get(this.props.navigation.state, 'params.farmerId', '');
    this.setState({
      farmerId
    });
    this._getData();
  };

  _getData = async () => {
    const { farmerId } = this.state;
    this.setState({ loading: true });
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getMandiriFarmerDetailById(farmerId);
      this.setState({ data: result.data });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  _onPressBankEdit = () => {
    const { farmerId, data } = this.state;
    this.props.navigation.navigate('BankDetailEdit', {
      bankId: 'd7176318-d2ab-4770-9ccb-aeb25b2104bc',
      farmerId,
      data: data.farmerBankDetail
    });
  };

  _onPressEmergencyEdit = () => {
    const { farmerId, data } = this.state;
    this.props.navigation.navigate('EmergencyContactEdit', {
      bankId: 'd7176318-d2ab-4770-9ccb-aeb25b2104bc',
      farmerId,
      data: data.farmerEmergencyContact
    });
  };

  _onPressFamilyEdit = () => {
    const { farmerId, data } = this.state;
    this.props.navigation.navigate('FamilyEdit', {
      bankId: 'd7176318-d2ab-4770-9ccb-aeb25b2104bc',
      farmerId,
      data: data.farmerFamilyDetail
    });
  };

  _onPressHouseEdit = () => {
    const { farmerId, data } = this.state;
    this.props.navigation.navigate('HouseEdit', {
      bankId: 'd7176318-d2ab-4770-9ccb-aeb25b2104bc',
      farmerId,
      data: data.farmerHouseDetail
    });
  };

  _onPressNationalityEdit = () => {
    const { farmerId, data } = this.state;
    this.props.navigation.navigate('NationalityEdit', {
      bankId: 'd7176318-d2ab-4770-9ccb-aeb25b2104bc',
      farmerId,
      data: data.farmerNationalityDetail
    });
  };

  _onPressSpouseEdit = () => {
    const { farmerId, data } = this.state;
    this.props.navigation.navigate('SpouseEdit', {
      bankId: 'd7176318-d2ab-4770-9ccb-aeb25b2104bc',
      farmerId,
      data: data.farmerSpouseDetail
    });
  };

  _onPressWorkEdit = () => {
    const { farmerId, data } = this.state;
    this.props.navigation.navigate('WorkEdit', {
      bankId: 'd7176318-d2ab-4770-9ccb-aeb25b2104bc',
      farmerId,
      data: data.farmerWorkDetail
    });
  };

  _getFarmerCountry = index => {
    const countryName = country[index].name;
    return countryName;
  };

  _getNationality = index => {
    const nationalityName = nationality[index].name;
    return I18n.t(`${nationalityName}`);
  };

  _dateDiff = fromDate => {
    const startDate = new Date(fromDate);
    const endDate = new Date();
    let totalMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    let diffDateString = `${totalMonths} ${I18n.t('month')}`;
    if (totalMonths > 12) {
      totalMonths /= 12;
      diffDateString = `${Math.floor(totalMonths)} ${I18n.t('year')}`;
    }
    return diffDateString;
  };

  render() {
    const { loading, data } = this.state;
    const farmerCountryOfResidence =
      data === undefined || data.farmerNationalityDetail.farmerCountryOfResidence < 0
        ? '-'
        : this._getFarmerCountry(data.farmerNationalityDetail.farmerCountryOfResidence);
    const farmerNationality =
      data === undefined || data.farmerNationalityDetail.farmerNationality < 0
        ? '-'
        : this._getNationality(data.farmerNationalityDetail.farmerNationality);
    const farmerMotherName =
      data === undefined || data.farmerFamilyDetail.farmerMotherName === ''
        ? '-'
        : data.farmerFamilyDetail.farmerMotherName;
    const farmerMaritalStatus =
      data === undefined || data.farmerFamilyDetail.farmerMaritalStatus < 0
        ? '-'
        : I18n.t(`${_.find(maritalStatus, { id: data.farmerFamilyDetail.farmerMaritalStatus }).name}`);
    const farmerDependentChild =
      data === undefined || data.farmerFamilyDetail.farmerDependentChild === ''
        ? '-'
        : data.farmerFamilyDetail.farmerDependentChild;
    const spouseName =
      data === undefined || data.farmerSpouseDetail.spouseName === ''
        ? '-'
        : data.farmerSpouseDetail.spouseName;
    const spouseNik =
      data === undefined || data.farmerSpouseDetail.spouseNik === ''
        ? '-'
        : data.farmerSpouseDetail.spouseNik;
    const spouseProfession =
      data === undefined || data.farmerSpouseDetail.spouseProfession < 0
        ? '-'
        : I18n.t(`${_.find(work, { id: data.farmerSpouseDetail.spouseProfession }).name}`);
    const spouseIncome =
      data === undefined || data.farmerSpouseDetail.spouseIncome === ''
        ? 'Rp -'
        : `Rp ${data.farmerSpouseDetail.spouseIncome}`;
    const spouseDateOfBirth =
      data === undefined || data.farmerSpouseDetail.spouseDateOfBirth === ''
        ? '-'
        : formatDate(data.farmerSpouseDetail.spouseDateOfBirth, 'DD MMM YYYY');
    const spousePlaceOfBirth =
      data === undefined || data.farmerSpouseDetail.spousePlaceOfBirth === ''
        ? '-'
        : data.farmerSpouseDetail.spousePlaceOfBirth;
    // const prenuptialAgreement =
    //   data === undefined || data.farmerSpouseDetail.divisionPropertyAggrement === ''
    //     ? '-'
    //     : data.farmerSpouseDetail.divisionPropertyAggrement;

    const farmerHouseAddress =
      data === undefined || data.farmerHouseDetail.farmerHouseAddress === ''
        ? '-'
        : data.farmerHouseDetail.farmerHouseAddress;
    const farmerHouseProvinceName =
      data === undefined || data.farmerHouseDetail.farmerHouseProvinceName === ''
        ? '-'
        : data.farmerHouseDetail.farmerHouseProvinceName;
    const farmerHouseDistrictName =
      data === undefined || data.farmerHouseDetail.farmerHouseDistrictName === ''
        ? '-'
        : data.farmerHouseDetail.farmerHouseDistrictName;
    const farmerHouseSubDistrictName =
      data === undefined || data.farmerHouseDetail.farmerHouseSubDistrictName === ''
        ? '-'
        : data.farmerHouseDetail.farmerHouseSubDistrictName;
    const farmerHouseVillageName =
      data === undefined || data.farmerHouseDetail.farmerHouseVillageName === ''
        ? '-'
        : data.farmerHouseDetail.farmerHouseVillageName;
    const farmerHouseZipCode =
      data === undefined || data.farmerHouseDetail.farmerHouseZipCode === ''
        ? '-'
        : data.farmerHouseDetail.farmerHouseZipCode;
    const farmerHouseOwnershipStatus =
      data === undefined || data.farmerHouseDetail.farmerHouseOwnershipStatus < 0
        ? '-'
        : I18n.t(`${_.find(ownership, { id: data.farmerHouseDetail.farmerHouseOwnershipStatus }).name}`);
    const farmerHouseLivedSince =
      data === undefined || data.farmerHouseDetail.farmerHouseLivedSince === ''
        ? '-'
        : formatDate(data.farmerHouseDetail.farmerHouseLivedSince, 'DD MMM YYYY');
    const farmerHouseRtRw =
      data === undefined || data.farmerHouseDetail.farmerHouseRtRw === ''
        ? '-'
        : data.farmerHouseDetail.farmerHouseRtRw;
    const farmerWork =
      data === undefined || data.farmerWorkDetail.farmerWork < 0
        ? '-'
        : I18n.t(`${_.find(work, { id: data.farmerWorkDetail.farmerWork }).name}`);
    const farmerWorkAddress =
      data === undefined || data.farmerWorkDetail.farmerWorkAddress === ''
        ? '-'
        : data.farmerWorkDetail.farmerWorkAddress;
    const farmerWorkSince =
      data === undefined || data.farmerWorkDetail.farmerWorkSince === ''
        ? '-'
        : this._dateDiff(data.farmerWorkDetail.farmerWorkSince);
    const farmerIncome =
      data === undefined || data.farmerWorkDetail.farmerIncome === ''
        ? 'Rp -'
        : `Rp ${data.farmerWorkDetail.farmerIncome}`;

    const farmerBankName =
      data === undefined || data.farmerBankDetail.farmerBankName === ''
        ? '-'
        : data.farmerBankDetail.farmerBankName;
    const farmerCardNumber =
      data === undefined || data.farmerBankDetail.farmerCardNumber === ''
        ? '-'
        : data.farmerBankDetail.farmerCardNumber;
    const emergencyName =
      data === undefined || data.farmerEmergencyContact.emergencyName === ''
        ? '-'
        : data.farmerEmergencyContact.emergencyName;
    const emergencyRelationship =
      data === undefined || data.farmerEmergencyContact.emergencyRelationship === ''
        ? '-'
        : data.farmerEmergencyContact.emergencyRelationship;
    const emergencyContactNumber =
      data === undefined || data.farmerEmergencyContact.emergencyContactNumber === ''
        ? '-'
        : data.farmerEmergencyContact.emergencyContactNumber;
    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <Header title={I18n.t('profileDetail')} back />
        <ScrollView style={styles.detailContainer}>
          <ProfileDetailCard
            onPressEdit={this._onPressNationalityEdit}
            customContainerStyle={styles.topCard}
            cardTitle={I18n.t('nationality')}
            fields={[
              {
                label: I18n.t('domicileCountry'),
                body: farmerCountryOfResidence
              },
              { label: I18n.t('nationality'), body: farmerNationality }
            ]}
          />
          <ProfileDetailCard
            onPressEdit={this._onPressFamilyEdit}
            customContainerStyle={styles.middleCard}
            cardTitle={I18n.t('familyDetail')}
            fields={[
              {
                label: I18n.t('motherName'),
                body: farmerMotherName
              },
              { label: I18n.t('dependents'), body: farmerDependentChild },
              {
                label: I18n.t('marriageStatus'),
                body: farmerMaritalStatus !== '-' ? farmerMaritalStatus : '-'
              }
            ]}
          />
          <ProfileDetailCard
            onPressEdit={this._onPressSpouseEdit}
            customContainerStyle={styles.middleCard}
            cardTitle={I18n.t('spouseDetail')}
            fields={[
              {
                label: I18n.t('spouseName'),
                body: spouseName
              },
              { label: I18n.t('spouseNik'), body: spouseNik },
              { label: I18n.t('work'), body: spouseProfession },
              { label: I18n.t('allowancePerMonth'), body: spouseIncome },
              { label: I18n.t('dateOfBirth'), body: spouseDateOfBirth },
              { label: I18n.t('placeOfBirth'), body: spousePlaceOfBirth }
              // { label: I18n.t('prenuptialAgreement'), body: tialAgreement }
            ]}
          />
          <ProfileDetailCard
            onPressEdit={this._onPressHouseEdit}
            customContainerStyle={styles.middleCard}
            cardTitle={I18n.t('houseDetail')}
            fields={[
              {
                label: I18n.t('address'),
                body: farmerHouseAddress
              },
              { label: '', body: '' },
              { label: I18n.t('provice'), body: farmerHouseProvinceName },
              { label: I18n.t('city'), body: farmerHouseDistrictName },
              { label: I18n.t('district'), body: farmerHouseSubDistrictName },
              { label: I18n.t('village'), body: farmerHouseVillageName },
              { label: I18n.t('postalCode'), body: farmerHouseZipCode },
              {
                label: I18n.t('ownershipStatus'),
                body: farmerHouseOwnershipStatus !== '-' ? farmerHouseOwnershipStatus : '-'
              },
              { label: I18n.t('livedSince'), body: farmerHouseLivedSince },
              { label: I18n.t('rtrw'), body: farmerHouseRtRw }
            ]}
          />
          <ProfileDetailCard
            onPressEdit={this._onPressWorkEdit}
            customContainerStyle={styles.middleCard}
            cardTitle={I18n.t('workDetail')}
            fields={[
              {
                label: I18n.t('work'),
                body: farmerWork
              },
              { label: '', body: '' },
              {
                label: I18n.t('address'),
                body: farmerWorkAddress
              },
              { label: '', body: '' },
              { label: I18n.t('workFor'), body: farmerWorkSince },
              { label: I18n.t('allowancePerMonth'), body: farmerIncome }
            ]}
          />
          <ProfileDetailCard
            onPressEdit={this._onPressBankEdit}
            customContainerStyle={styles.middleCard}
            cardTitle={I18n.t('bankDetail')}
            fields={[
              {
                label: I18n.t('bankName'),
                body: farmerBankName
              },
              { label: I18n.t('bankAccountNo'), body: farmerCardNumber }
            ]}
          />
          <ProfileDetailCard
            onPressEdit={this._onPressEmergencyEdit}
            customContainerStyle={styles.middleCard}
            cardTitle={I18n.t('emergencyContact')}
            fields={[
              {
                label: I18n.t('contactablePerson'),
                body: emergencyName
              },
              { label: '', body: '' },
              { label: I18n.t('relationship'), body: emergencyRelationship },
              { label: '', body: '' },
              { label: I18n.t('emergencyContactNo'), body: emergencyContactNumber }
            ]}
          />
        </ScrollView>
      </MainScreen>
    );
  }
}
