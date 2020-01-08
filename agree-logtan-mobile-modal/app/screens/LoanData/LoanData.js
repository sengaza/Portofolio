import React from 'react';
import { View, FlatList, StatusBar, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './LoanData.styles';
import MainScreen from '../../components/layouts/MainScreen';
import { noop, getFirstName } from '../../utils';
import I18n from '../../i18n';
import { COLOR_WHITE } from '../../styles';
import FarmerCard from '../../components/elements/FarmerCard';
import Header from '../../components/elements/Header';
// import farmerDummy from '../../dummy/farmers.json';
// import AddButton from '../../components/elements/AddButton';
import { ENDPOINT } from '../../configs';
import errors from '../../utils/errors';
import SvgSad from '../../../assets/svgs/Sad';

export default class FarmerData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false
    };
  }
  // async componentWillMount() {
  //   await this.getParams();
  // }

  async componentDidMount() {
    this._getData();
    this._navListener = this.props.navigation.addListener('didFocus', async () => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor(COLOR_WHITE);
    });
  }

  // getParams = () => {
  // const dataParams = _.get(this.props.navigation.state, 'params.data', '');
  // const mitraIdParams = _.get(this.props.navigation.state, 'params.mitraId', '');
  // this.setState({
  //   data: farmerDummy
  //   mitraId: mitraIdParams
  //   });
  // };

  _getData = async () => {
    try {
      this.setState({ loading: true });
      const result = await ENDPOINT.getLoanList();
      //   if (result.success === true) {
      await this.setState({ data: result.data });
      // this._filterByStatus();
    } catch (error) {
      // }
      errors.createError(I18n.t('error.timeOutConnection'));
    } finally {
      this.setState({ loading: false });
    }
  };

  //   _onPressAdd = () => {
  //     const { mitraId } = this.state;
  //     this.props.navigation.navigate('AddFarmer', { mitraId });
  //   };

  _onPressDetail = farmerId => () => {
    this.props.navigation.navigate('FarmerProfile', { farmerId });
  };

  _renderItem = item => {
    const { farmerName = '', farmerImage = '', farmerNik = '', farmerLoanStatus = '' } = item.item;
    // const capDistrict = fixDistrict(district);
    const farmerFirstName = getFirstName(farmerName);
    return (
      <View>
        <FarmerCard
          topLeft={farmerFirstName}
          bottomLeft={farmerNik}
          farmerImage={farmerImage}
          topRight={farmerLoanStatus}
          onPress={() => noop}
        />
      </View>
    );
  };

  _filterByStatus = () => {
    let { data } = this.state;

    data = data
      .filter(item => item.farmerLoanStatus && item.farmerLoanStatus !== '')
      .map(({ farmerId, farmerName, farmerNik, farmerLoanStatus }) => ({
        farmerId,
        farmerName,
        farmerNik,
        farmerLoanStatus
      }));
    this.setState({ data });
  };
  _renderList = () => {
    const { data } = this.state;
    return (
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          // ListEmptyComponent={
          //   <EmptyList topText={I18n.t('noFarmer')} bottomText={I18n.t('clickAddFarmer')} />
          // }
          ListEmptyComponent={<View />}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  };

  _renderListEmpty = () => (
    <View style={styles.container}>
      <SvgSad />
      <Text> {`${I18n.t('noFarmer')}`} </Text>
      <Text>{`${I18n.t('addFarmer')}`}</Text>
    </View>
  );
  _onPressAdd = () => {
    // this.props.navigation.navigate('AddFarmer');
  };

  render() {
    const { loading, data = [] } = this.state;
    return (
      <MainScreen loading={loading}>
        <StatusBar backgroundColor={COLOR_WHITE} StatusBarAnimation="none" showHideTransition="hidden" />
        <Header title={I18n.t('loanData')} back search />
        {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          {data.length === 0 && loading === false ? (
            <View style={{ marginTop: Dimensions.get('window').height / 2 - 150 }}>
              <EmptyList topText={I18n.t('noFarmer')} bottomText={I18n.t('clickAddFarmer')} />
            </View>
          ) : ( */}
        {data.length === 0 ? this._renderListEmpty() : this._renderList()}
        {/* )}
        </ScrollView> */}
        {/* <AddButton style={styles.addButton} onPress={this._onPressAdd} /> */}
      </MainScreen>
    );
  }
}

FarmerData.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  navigation: PropTypes.object
};

FarmerData.defaultProps = {
  navigation: noop
};
