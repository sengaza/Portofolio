import { StackNavigator } from 'react-navigation';
import Home from '../screens/Home';
import UploadPhoto from '../screens/UploadPhoto';
import FarmerData from '../screens/FarmerData';
import History from '../screens/History';
import Account from '../screens/Account';
import AddLand from '../screens/AddLand';
import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/Login';
import FarmerProfile from '../screens/FarmerProfile';
import FarmerDetail from '../screens/FarmerDetail';
import LandData from '../screens/LandData';
import LandDetail from '../screens/LandDetail';
import AddFarmer from '../screens/AddFarmer';
import NationalityEdit from '../screens/NationalityEdit';
import FamilyEdit from '../screens/FamilyEdit';
import LoanData from '../screens/LoanData';
import HouseEdit from '../screens/HouseEdit';
import WorkEdit from '../screens/WorkEdit';
import LandDescriptionEdit from '../screens/LandDescriptionEdit';
import LandLocationEdit from '../screens/LandLocationEdit';
import PlantingSeasonEdit from '../screens/PlantingSeasonEdit';
import BankDetailEdit from '../screens/BankDetailEdit';
import EmergencyContactEdit from '../screens/EmergencyContactEdit';
import PreScreening from '../screens/PreScreening';
import SpouseEdit from '../screens/SpouseEdit';
import ApplyLoan from '../screens/ApplyLoan';

export const HomeStack = StackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarVisible: true
      }
    },
    FarmerData: {
      screen: FarmerData,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    LoanData: {
      screen: LoanData,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    FarmerDetail: {
      screen: FarmerDetail,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    FarmerProfile: {
      screen: FarmerProfile,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    LandData: {
      screen: LandData,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    LandDetail: {
      screen: LandDetail,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    AddFarmer: {
      screen: AddFarmer,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    AddLand: {
      screen: AddLand,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    NationalityEdit: {
      screen: NationalityEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    FamilyEdit: {
      screen: FamilyEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    HouseEdit: {
      screen: HouseEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    WorkEdit: {
      screen: WorkEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    LandDescriptionEdit: {
      screen: LandDescriptionEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    SpouseEdit: {
      screen: SpouseEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    BankDetailEdit: {
      screen: BankDetailEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    EmergencyContactEdit: {
      screen: EmergencyContactEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    LandLocationEdit: {
      screen: LandLocationEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    PreScreening: {
      screen: PreScreening,
      navigationOptions: {
        tabBarVisible: false
    }
  },
    PlantingSeasonEdit: {
      screen: PlantingSeasonEdit,
      navigationOptions: {
        tabBarVisible: false
      }
    },
    ApplyLoan: {
      screen: ApplyLoan,
      navigationOptions: {
        tabBarVisible: false
      }
    }
  },
  { headerMode: 'none', header: null, navigationOptions: { tabBarVisible: false } }
);

export const UploadPhotoStack = StackNavigator(
  {
    UploadPhoto: {
      screen: UploadPhoto,
      navigationOptions: {
        tabBarVisible: true
      }
    },
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const InboxStack = StackNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const SettingsStack = StackNavigator(
  {
    Account: {
      screen: Account,
      navigationOptions: {
        tabBarVisible: true
      }
    }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);

export const OnBoardingStack = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        tabBarVisible: false
      }
    }
    // OnBoarding: {
    //   screen: OnBoarding,
    //   navigationOptions: {
    //     tabBarVisible: false
    //   }
    // }
  },
  { headerMode: 'none', navigationOptions: { tabBarVisible: false } }
);
