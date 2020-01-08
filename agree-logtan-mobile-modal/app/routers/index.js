import { SwitchNavigator } from 'react-navigation';
import { OnBoardingStack } from './stackNavigator';
import { AppStack } from './tabNavigator';
import { Drawer } from './drawerNavigator';
import AuthFirstOpen from '../screens/AuthFirstOpen';

export default SwitchNavigator(
  {
    AuthFirstOpen : AuthFirstOpen,
    OnBoarding: OnBoardingStack,
    Home: AppStack,
    App: Drawer
  },
  {
    initialRouteName: 'AuthFirstOpen'
  }
);
