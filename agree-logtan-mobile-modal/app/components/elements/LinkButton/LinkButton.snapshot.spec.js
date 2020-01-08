import React from 'react';
import renderer from 'react-test-renderer';

import LinkButton from './LinkButton';

jest.mock('./LinkButton.styles.js');
jest.mock('Text', () => 'Text');

test('LinkButton renders correctly', () => {
  const tree = renderer.create(<LinkButton />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('LinkButton renders correctly when text is set', () => {
  const tree = renderer.create(<LinkButton title="Hello" />).toJSON();
  expect(tree).toMatchSnapshot();
});
