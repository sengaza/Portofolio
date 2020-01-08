import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';

import LinkButton from './LinkButton';

jest.mock('./LinkButton.styles', () => ({}));

describe('LinkButton Component', () => {
  beforeEach(() => {
    this.props = {
      title: 'Hello',
      onPress: jest.fn()
    };
  });

  afterEach(() => {
    this.props = null;
    jest.resetAllMocks();
  });

  test('should trigger onPress when clicking on the button', () => {
    const { props } = this;

    const subject = shallow(<LinkButton {...props} />);

    subject
      .find(Text)
      .at(0)
      .simulate('press');
    expect(props.onPress).toHaveBeenCalled();
  });
});
