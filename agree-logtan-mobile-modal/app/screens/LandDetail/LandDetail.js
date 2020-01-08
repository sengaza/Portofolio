import React from 'react';
import { View, StatusBar, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './LandDetail.styles';
import Header from '../../components/elements/Header';
import LandDetailCard from '../../components/elements/LandDetailCard';
import MainScreen from '../../components/layouts/MainScreen';
import { ENDPOINT, IMAGES } from '../../configs';
import irrigationData from '../../fixtures/irrigation.json';
import I18n from '../../i18n';
import { COLOR_WHITE } from '../../styles';
import { noop, roundNum, formatDate } from '../../utils';
import errors from '../../utils/errors';
import SvgUpload from '../../../assets/svgs/Upload';

export default class LandDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loading: false
    };
  }

  async componentWillMount() {
    await this.getParams();
  }

  async componentDidMount() {
    this._getData();
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
  }

  _getData = async () => {
    const { landId } = this.state;

    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getLandDetailById(landId);
      await this.setState({ data: result.data });
    } catch (error) {
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  getParams = () => {
    const { navigation } = this.props;
    const landId = _.get(navigation.state, 'params.landId', '');
    const farmerLoanStatus = _.get(navigation.state, 'params.farmerLoanStatus', '');

    this.setState({ landId, farmerLoanStatus });
  };

  _onPressEdit = params => () => {
    const { navigation } = this.props;
    const { landId, data, farmerLoanStatus } = this.state;

    navigation.navigate(params, { landId, data, farmerLoanStatus });
  };

  _renderCardBody(label, value) {
    return (
      <View style={styles.cardBody}>
        <Text style={styles.labelText}>{label}</Text>
        <Text style={styles.valueText}>{value || '-'}</Text>
      </View>
    );
  }

  _renderDescription() {
    const { data } = this.state;
    const { plantingSeasonIrrigation, plantingSeasonName, plantingSeasonSize } = data || {};
    const convertedSize = plantingSeasonSize * 10000;
    const irrigation = irrigationData.find(e => e.id === plantingSeasonIrrigation);

    return (
      <LandDetailCard
        onPressEdit={this._onPressEdit('LandDescriptionEdit')}
        title={I18n.t('landDescription')}
      >
        {this._renderCardBody(I18n.t('landName'), plantingSeasonName)}
        <View style={styles.column}>
          {this._renderCardBody(I18n.t('activeLandSize'), convertedSize && `${roundNum(convertedSize)} m2`)}
          {this._renderCardBody(I18n.t('irrigation'), irrigation && I18n.t(irrigation.name))}
        </View>
      </LandDetailCard>
    );
  }

  _renderImage() {
    const { data } = this.state;
    const { plantingSeasonImage } = data || {};
    const image = plantingSeasonImage ? { uri: plantingSeasonImage } : IMAGES.emptyLand;

    return (
      <LandDetailCard title={I18n.t('landImage')}>
        <View style={styles.uploadContainer}>
          <TouchableOpacity onPress={noop} style={styles.uploadButton}>
            <Image source={image} style={styles.landTemplate} />
          </TouchableOpacity>
          <View style={styles.uploadTextContainer}>
            <SvgUpload />
            <Text style={styles.uploadText}>{I18n.t('uploadPhoto')}</Text>
          </View>
        </View>
      </LandDetailCard>
    );
  }

  _renderLocation() {
    const { data } = this.state;
    const { plantingSeasonAddress, plantingSeasonLatitude, plantingSeasonLongtitude } = data || {};
    const coordinates =
      plantingSeasonLatitude || plantingSeasonLongtitude
        ? `${plantingSeasonLongtitude}, ${plantingSeasonLatitude}`
        : '-';

    return (
      <LandDetailCard onPressEdit={this._onPressEdit('LandLocationEdit')} title={I18n.t('landLocation')}>
        {this._renderCardBody(I18n.t('coordinate'), coordinates)}
        {this._renderCardBody(I18n.t('landAddress'), plantingSeasonAddress)}
      </LandDetailCard>
    );
  }

  _renderPlantingSeason() {
    const { data } = this.state;
    const {
      plantingSeasonCommodityName,
      plantingSeasonVarietyName,
      plantingSeasonStartDate,
      plantingSeasonEstimatedHarvest
    } = data || {};

    return (
      <LandDetailCard
        onPressEdit={this._onPressEdit('PlantingSeasonEdit')}
        title={I18n.t('plantingSeasonPeriod')}
      >
        <View style={styles.column}>
          {this._renderCardBody(
            I18n.t('startPeriod'),
            plantingSeasonStartDate && formatDate(plantingSeasonStartDate, 'DD MMM YYYY')
          )}
          {this._renderCardBody(
            I18n.t('commodity'),
            plantingSeasonCommodityName && I18n.t(plantingSeasonCommodityName.toLowerCase().replace(' ', ''))
          )}
        </View>
        <View style={styles.column}>
          {this._renderCardBody(
            I18n.t('variety'),
            plantingSeasonVarietyName && I18n.t(plantingSeasonVarietyName.toLowerCase())
          )}
          {this._renderCardBody(
            I18n.t('estimatedHarvest'),
            plantingSeasonEstimatedHarvest && `${plantingSeasonEstimatedHarvest} kg`
          )}
        </View>
      </LandDetailCard>
    );
  }

  render() {
    const { loading } = this.state;

    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <Header title={I18n.t('landDetail')} back />
        <ScrollView style={styles.container}>
          {this._renderDescription()}
          {this._renderLocation()}
          {this._renderPlantingSeason()}
          {this._renderImage()}
        </ScrollView>
      </MainScreen>
    );
  }
}

LandDetail.propTypes = {
  navigation: PropTypes.object
};

LandDetail.defaultProps = {
  navigation: noop
};
