import React from 'react';
import { TabNavigator } from 'react-navigation';
import { HomeStack, InboxStack, SettingsStack } from './stackNavigator';
import TabBarBottom from '../components/elements/TabBarBottom';
import TabBarIcon from '../components/elements/TabBarIcon';
import Home from '../../assets/svgs/Home';
import Inbox from '../../assets/svgs/Inbox';
import Settings from '../../assets/svgs/Setting';
import I18n from '../i18n';
import { COLOR_BASE_PRIMARY_MAIN, COLOR_GREY_60 } from '../styles';
import { verticalScale } from '../utils/scaling';


const COLOR_DARK_GREY = '#797979';
const COLOR_GREEN = '#1ea54f';
const COLOR_GREY = '#bdbdbd';
const COLOR_WHITE = '#ffffff';

const createTab = ({ stack, label, image, iconStyle, badge }) => ({
  screen: stack,
  navigationOptions: ({ navigation }) => ({
    tabBarLabel: label,
    tabBarIcon: ({ tintColor }) => (
      <TabBarIcon
        isActive={tintColor === COLOR_BASE_PRIMARY_MAIN}
        label={label}
        icon={tintColor === COLOR_BASE_PRIMARY_MAIN ? image.active : image.inactive}
        iconStyle={[iconStyle, { height: 32, width: 32, tintColor }]}
        badge={badge}
        navigation={navigation}
      />
    )
  })
});

const navigatorConfig = {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  backBehavior: true,
  lazy: true,
  swipeEnabled: false,
  animationEnabled: true,
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    activeTintColor: COLOR_BASE_PRIMARY_MAIN,
    inactiveTintColor: COLOR_GREY_60,
    style: {
      borderTopWidth: 0,
      justifyContent: 'space-between',
      backgroundColor: COLOR_WHITE,
      height: verticalScale(70)
    },
    labelStyle: {
      color: COLOR_GREY_60
    },
    tabStyle: {},
    indicatorStyle: {
      backgroundColor: COLOR_WHITE
    }
  }
};

const createTabNavigator = (tabDefinations = []) => {
  const tabs = tabDefinations.map(createTab);
  return new TabNavigator(tabs, navigatorConfig);
};

export const AppStack = createTabNavigator([
  {
    label: I18n.t('home'),
    stack: HomeStack,
    image: {
      active: <Home active />,
      inactive: <Home />
    }
  },
  // {
  //   label: 'Photo',
  //   stack: UploadPhotoStack,
  //   image: {
  //     active: <Add active />,
  //     inactive: <Add />
  //   }
  // },
  {
    label: 'Inbox',
    stack: InboxStack,
    image: {
      active: <Inbox active />,
      inactive: <Inbox />
    },
    badge: 'number'
  },
  {
    label: I18n.t('settings'),
    stack: SettingsStack,
    image: {
      active: <Settings active />,
      inactive: <Settings />
    }
  }
]);

export default { AppStack };
