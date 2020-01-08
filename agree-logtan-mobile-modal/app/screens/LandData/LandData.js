import React from 'react';
import { View, FlatList, StatusBar, ScrollView, Text } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import styles from './LandData.styles';
import AddButton from '../../components/elements/AddButton';
import Header from '../../components/elements/Header';
import LandCard from '../../components/elements/LandCard';
import MainScreen from '../../components/layouts/MainScreen';
import { ENDPOINT } from '../../configs';
import I18n from '../../i18n';
import { COLOR_WHITE } from '../../styles';
import { noop, roundNum, formatDate } from '../../utils';
import errors from '../../utils/errors';
import SvgSad from '../../../assets/svgs/Sad';

export default class LandData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
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

  getParams = () => {
    const { navigation } = this.props;
    const farmerId = _.get(navigation.state, 'params.farmerId', '');
    const farmerLoanStatus = _.get(navigation.state, 'params.farmerLoanStatus', '');

    this.setState({ farmerId, farmerLoanStatus });
  };

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

  _onPressAdd = () => {
    const { farmerId } = this.state;

    this.props.navigation.navigate('AddLand', { farmerId });
  };

  _onPressDetail = landId => () => {
    const { farmerLoanStatus } = this.state;

    this.props.navigation.navigate('LandDetail', { landId, farmerLoanStatus });
  };

  _renderItem = item => {
    const {
      plantingSeasonId,
      plantingSeasonImage,
      plantingSeasonName,
      plantingSeasonSize,
      plantingSeasonStartDate
    } = item.item;
    const convertedSize = plantingSeasonSize * 10000;

    return (
      <View>
        <LandCard
          bottomLeftText={roundNum(convertedSize)}
          bottomRightText={plantingSeasonStartDate && formatDate(plantingSeasonStartDate, 'DD MMM YYYY')}
          image={plantingSeasonImage}
          onPress={this._onPressDetail(plantingSeasonId)}
          topText={plantingSeasonName}
        />
      </View>
    );
  };

  _renderList = () => {
    const { data = [] } = this.state;

    return (
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          ListEmptyComponent={<View />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  };

  _renderListEmpty = () => (
    <View style={styles.container}>
      <SvgSad />
      <Text> {`${I18n.t('noActiveLand')}`} </Text>
      <Text>{`${I18n.t('addActiveLand')}`}</Text>
    </View>
  );

  render() {
    const { loading, data = [] } = this.state;

    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <Header title={I18n.t('activeLand')} back history />
        {data.length === 0 ? this._renderListEmpty() : this._renderList()}
        <AddButton onPress={this._onPressAdd} />
      </MainScreen>
    );
  }
}

LandData.propTypes = {
  navigation: PropTypes.object
};

LandData.defaultProps = {
  navigation: noop
};
