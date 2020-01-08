import { assertSnapshots } from '../../../utils/TestUtils/snapshot';
import DashboardWidget from './DashboardWidget';

jest.mock('./DashboardWidget.styles', () => ({}));
jest.mock('Text', () => 'Text');

describe('DashboardWidget snapshot testing', () => {
  const configs = [
    {
      state: {},
      props: {
        gradient: {},
        displayingData: {
          assignedToLand: undefined
        }
      },
      desc: 'renders default props'
    },
    {
      state: {},
      props: {
        gradient: {},
        displayingData: {
          assignedToLand: 1
        }
      },
      desc: 'renders default props with displayingData'
    },
    {
      state: {},
      props: {},
      desc: 'renders without props'
    }
  ];
  assertSnapshots(DashboardWidget, configs);
});
