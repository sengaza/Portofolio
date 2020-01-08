import { assertSnapshots } from '../../../utils/TestUtils/snapshot';
import RadioGroup from './RadioGroup';

jest.mock('./RadioGroup.styles', () => ({}));
jest.mock('../RadioButton', () => 'RadioButton');

describe('RadioGroup snapshot testing', () => {
  const configs = [
    {
      props: {},
      desc: 'renders with default value'
    },
    {
      props: {
        options: [
          {
            name: 'Male',
            id: 'male'
          },
          {
            name: 'Female',
            id: 'female'
          }
        ],
        selectedIndex: 1,
        spaceBetween: 0
      },
      desc: 'renders with defined value'
    }
  ];
  assertSnapshots(RadioGroup, configs);
});
