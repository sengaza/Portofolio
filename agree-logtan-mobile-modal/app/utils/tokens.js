import { AsyncStorage } from 'react-native';

const CREDENTIALS_KEY = 'CREDENTIALS_KEY';
const DEFAULT_EXPIRED_ONE_DAY = 86400;

class Tokens {
  constructor(storage = AsyncStorage) {
    this.storage = storage;
  }

  static calculateExpiresAt(expiresIn) {
    const now = new Date();
    now.setSeconds(now.getSeconds() + expiresIn);

    return now;
  }

  /**
   * Get tokens from storage
   */
  async get() {
    const value = await this.storage.getItem(CREDENTIALS_KEY);
    if (!value) return null; // No tokens were found

    const tokens = JSON.parse(value);
    tokens.expiresAt = new Date(tokens.expiresAt);

    const { accessToken, idToken, expiresAt } = tokens;
    const threshold = 1000 * 60 * 60; // 1 hour
    if (expiresAt > Date.now() + threshold) {
      // Tokens will still be valid for an hour, use it.
      return {
        accessToken,
        idToken
      };
    }

    // Tokens expire in the next hour or already expired
    await this.clear();
    return null;
  }

  /**
   * Remove Tokens from storage
   */
  async clear() {
    return this.storage.removeItem(CREDENTIALS_KEY);
  }

  /**
   * Save tokens to storage
   * @param {Object} tokens - { accessToken, idToken } for service access
   */
  async save(tokens) {
    const { accessToken, idToken, expiresIn = DEFAULT_EXPIRED_ONE_DAY } = tokens;
    const value = JSON.stringify({
      accessToken,
      idToken,
      expiresAt: Tokens.calculateExpiresAt(expiresIn)
    });
    return this.storage.setItem(CREDENTIALS_KEY, value);
  }
}

export { Tokens };
export default new Tokens(AsyncStorage);
