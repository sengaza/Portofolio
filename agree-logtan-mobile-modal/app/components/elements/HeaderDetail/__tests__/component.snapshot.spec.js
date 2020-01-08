import React from 'react';
import { View } from 'react-native';
import { assertSnapshots, mockSetState } from '../../../../utils/TestUtils/snapshot';
import HeaderList from '../index';

jest.mock('../../BackButton', () => 'BackButton');
jest.mock('../../CloseButton', () => 'CloseButton');
jest.mock('../../SearchButton', () => 'SearchButton');
jest.mock('../../SearchTextInput', () => 'SearchTextInput');

describe('HeaderList snapshot testing', () => {
  const configs = [
    {
      props: {},
      desc: 'renders without data'
    },
    {
      props: { back: true },
      desc: 'renders with back'
    },
    {
      props: { close: true },
      desc: 'renders without data'
    },
    {
      props: { search: true },
      desc: 'renders without data'
    },
    {
      state: {},
      props: {
        leftComponent: <View />,
        rightComponent: <View />,
        centerComponent: <View />
      },
      desc: 'renders without data'
    },
    {
      state: { searchVisible: false },
      props: {},
      desc: 'renders with isSearching true'
    }
  ];
  assertSnapshots(HeaderList, configs);
});

describe('_renderLeft', () => {
  const ComponentWithMockedState = mockSetState(HeaderList);
  const getInstance = props => new ComponentWithMockedState(props);
  beforeEach(() => {
    this.props = {
      navigation: {
        navigate: jest.fn(),
        goBack: jest.fn()
      },
      onChangeTxtKeyword: jest.fn()
    };
  });

  afterEach(() => {
    this.props = null;
    jest.clearAllMocks();
  });

  test('_onPress', () => {
    const instance = getInstance(this.props);
    instance._onPress();
    expect(instance.state.searchVisible).toBeTruthy();
  });

  test('_onCancel', () => {
    const instance = getInstance(this.props);
    instance._onPress();
    expect(instance.state.searchVisible).toBeTruthy();
    instance._onCancel();
  });

  test('_renderHeaderSearch', () => {
    const instance = getInstance(this.props);
    instance._onPress();
    instance._renderHeaderSearch();
  });
});
