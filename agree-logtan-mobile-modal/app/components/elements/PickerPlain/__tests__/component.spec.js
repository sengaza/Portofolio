import { assertSnapshots, mockSetState } from '../../../../utils/TestUtils/snapshot';
import PickerPlain from '../PickerPlain';

jest.mock('../../../../configs', () => ({
  IMAGES: {}
}));

describe('Component snapshot testing', () => {
  const configs = [
    {
      props: { options: [0, 1, 2] },
      desc: 'renders without data'
    },
    {
      state: { open: true },
      props: { options: [0, 1, 2, 3, 4] },
      desc: 'renders without data'
    },
    {
      state: { open: true },
      props: { options: [0, 1, 2, 3, 4, 5] },
      desc: 'renders without data'
    }
  ];
  assertSnapshots(PickerPlain, configs);
});

describe('PickerPlain', () => {
  const ComponentWithMockedState = mockSetState(PickerPlain);
  // eslint-disable-next-line no-unused-vars
  const getInstance = props => new ComponentWithMockedState(props);
  beforeEach(() => {
    this.props = {
      navigation: {
        goBack: jest.fn()
      }
    };
  });

  afterEach(() => {
    this.props = null;
    jest.clearAllMocks();
  });

  test('_dropdownShow', async () => {
    const instance = getInstance(this.props);
    await instance._dropdownShow();
  });

  test('_dropdownHide', async () => {
    const instance = getInstance(this.props);
    await instance._dropdownHide();
  });

  test('renderRow', async () => {
    const option = '';
    const instance = getInstance(this.props);
    await instance.renderRow(option);
  });

  test('renderSeparator', async () => {
    const instance = getInstance(this.props);
    await instance.renderSeparator();
  });
});
