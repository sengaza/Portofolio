import { AsyncStorage } from 'react-native';
import tokens from './tokens';

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn(() => Promise.resolve())
  }
}));

/**
 * NOTES - GUIDELINES
 * 1. Mock out dependencies you don't want to test
 * Better to mock out underlying services, integrations, storage, etc.
 * We don't want to test for their correctness. We assume those work well.
 *
 * 2. What to test?
 * Test weather the single unit of work (a given function) works correctly and as expected
 * or not given various inputs, including edge cases
 */

describe('Tokens Service', () => {
  it('should return a null if token was not found in storage', async () => {
    AsyncStorage.getItem.mockImplementationOnce(() => Promise.resolve(null));

    const token = await tokens.get('key');
    expect(token).toBeNull();
  });

  it('should return a token if token was not found in storage', async () => {
    AsyncStorage.getItem.mockImplementationOnce(() =>
      Promise.resolve(
        JSON.stringify({
          accessToken: 'abc',
          idToken: 'def',
          expiresAt: 2527261200000
        })
      )
    );

    const token = await tokens.get('key');
    expect(token).toEqual({
      accessToken: 'abc',
      idToken: 'def'
    });
  });
});
