import { AsyncStorage } from 'react-native';
import cache from './cache';

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

describe('Cache Service', () => {
  test('get return null', async () => {
    AsyncStorage.getItem.mockImplementationOnce(() => Promise.resolve(null));

    const data = await cache.get('key');
    expect(data).toBeNull();
  });

  test('get return data', async () => {
    const data = {
      data: 'data',
      expiresAt: 2527261200000
    };
    AsyncStorage.getItem.mockImplementationOnce(() => Promise.resolve(JSON.stringify(data)));

    const result = await cache.get('key');
    expect(result).toEqual({
      data: 'data',
      expiresAt: new Date(2527261200000)
    });
  });
});
