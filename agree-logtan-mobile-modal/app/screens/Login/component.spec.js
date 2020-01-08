import { assertSnapshots, mockSetState } from '../../utils/TestUtils/snapshot';
import Component from './index';
import { ENDPOINT } from '../../configs';

jest.mock('../../../components/layouts/MainScreen', () => 'MainScreen');
jest.mock('rn-fetch-blob', () => 'RNFetchBlob');

jest.mock('../../../configs', () => ({
  ENDPOINT: {
    login: jest.fn()
  },
  IMAGES: {}
}));

describe('Component snapshot testing', () => {
  const configs = [
    {
      state: {},
      props: {},
      desc: 'renders without data'
    },
    {
      state: { error: true },
      props: {},
      desc: 'renders with data'
    }
  ];
  assertSnapshots(Component, configs);
});

describe('Component', () => {
  const ComponentWithMockedState = mockSetState(Component);
  const getInstance = props => new ComponentWithMockedState(props);
  beforeEach(() => {
    this.props = {
      navigation: {
        navigate: jest.fn(),
        goBack: jest.fn()
      }
    };
  });

  afterEach(() => {
    this.props = null;
    jest.clearAllMocks();
  });

  describe('_handleLogin', async () => {
    test('successTrue', async () => {
      const result = {
        data: {},
        success: true
      };

      ENDPOINT.login.mockImplementationOnce(() => Promise.resolve(result));
      const instance = getInstance(this.props);
      await instance.setState({ username: '', password: '' });
      await instance._handleLogin();
      expect(instance.state.data).toEqual(result.code);
      expect(ENDPOINT.login).toHaveBeenCalled();
      expect(instance.state.loading).toBeFalsy();
    });
    test('successFalse', async () => {
      const result = {
        data: {},
        success: false
      };
      ENDPOINT.login.mockImplementationOnce(() => Promise.resolve(result));
      const instance = getInstance(this.props);
      await instance.setState({ username: 'abc', password: 'abc' });
      await instance._handleLogin();
      expect(instance.state.data).toEqual(result.code);
      expect(ENDPOINT.login).toHaveBeenCalled();
      expect(instance.state.loading).toBeFalsy();
    });

    test('failed', async () => {
      const error = { error: 'error' };
      ENDPOINT.login.mockImplementationOnce(() => Promise.reject(error));
      const instance = getInstance(this.props);
      await instance._handleLogin();
      expect(ENDPOINT.login).toHaveBeenCalled();
    });
  });
  test('_handleCheckbox', async () => {
    const instance = getInstance(this.props);
    await instance._handleCheckbox();
  });

  test('_handleShowPass', async () => {
    const instance = getInstance(this.props);
    await instance._handleShowPass();
  });

  test('_handleUsername', async () => {
    const instance = getInstance(this.props);
    await instance.setState({ text: '' });
    await instance._handleUsername();
  });

  test('_handlePassword', async () => {
    const instance = getInstance(this.props);
    await instance.setState({ text: '' });
    await instance._handlePassword();
  });

  test('checkFieldTrue', async () => {
    const instance = getInstance(this.props);
    await instance.setState({ username: '', password: '' });
    await instance.checkField();
  });

  test('checkFieldFalse', async () => {
    const instance = getInstance(this.props);
    await instance.setState({ username: 'abc', password: '123' });
    await instance.checkField();
  });

  test('_handleSnackBar', async () => {
    const instance = getInstance(this.props);
    await instance._handleSnackBar();
  });
});

//   // test('_closeSnackbar', async () => {
//   //   const instance = getInstance(this.props);
//   //   await instance._closeSnackbar();
//   //   expect(instance.state.snackBar).toBeFalsy();
//   // });

//   test('_handleShowPass', async () => {
//     const instance = getInstance(this.props);
//     await instance._handleShowPass();
//     // expect(instance.state.checked).toBe(!instance.state.checked);
//   });

//   test('_handleUsername', async () => {
//     const text = '';
//     const instance = getInstance(this.props); // wajib
//     instance.checkField = jest.fn(); //memberi tahu checkfield sebuah function
//     await instance._handleUsername(text); //manggil fungsi handleusername
//     expect(instance.state.username).toBe(text);
//     expect(instance.checkField).toBeCalled(); //gamasuk ke checkfield
//   });

//   test('_handlePassword', async () => {
//     const text = '';
//     const instance = getInstance(this.props);
//     instance.checkField = jest.fn();
//     await instance._handlePassword(text);
//     expect(instance.state.password).toBe(text);
//     expect(instance.checkField).toBeCalled();
//   });

//   test('checkField when empty', async () => {
//     const instance = getInstance(this.props);
//     instance.setState({ username: '', password: '' }); //instance = this
//     await instance.checkField();
//     expect(instance.state.disableButton).toBeTruthy();
//   });

//   test('checkField when filled', async () => {
//     const instance = getInstance(this.props);
//     instance.setState({ username: 'username', password: 'password' });
//     await instance.checkField();
//     expect(instance.state.disableButton).toBeFalsy();
// });
